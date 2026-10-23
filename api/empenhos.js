const crypto=require('node:crypto');
const spreadsheet='1KKeA5lKttywZp-AvILAhsmfc6XjQ86nYs3OirjE0zco';
const range="'Almox • Situação e prazo'!A1:N2000";
function b64(x){return Buffer.from(JSON.stringify(x)).toString('base64url')}
async function accessToken(){
 const email=process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
 const key=(process.env.GOOGLE_PRIVATE_KEY||'').replace(/\\n/g,'\n');
 if(!email||!key)throw Error('Conta de serviço Google ainda não configurada');
 const now=Math.floor(Date.now()/1000);
 const jwt=b64({alg:'RS256',typ:'JWT'})+'.'+b64({iss:email,scope:'https://www.googleapis.com/auth/spreadsheets.readonly',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3300});
 const signature=crypto.sign('RSA-SHA256',Buffer.from(jwt),key).toString('base64url');
 const r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:jwt+'.'+signature})});
 if(!r.ok)throw Error('Falha de autenticação no Google');
 return (await r.json()).access_token;
}
module.exports=async(req,res)=>{
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET')return res.status(405).json({error:'Método não permitido'});
 try{
 const token=await accessToken();
 const r=await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+spreadsheet+'/values/'+encodeURIComponent(range),{headers:{Authorization:'Bearer '+token}});
 if(!r.ok)throw Error('Sem acesso à planilha: compartilhe com a conta de serviço como Leitor');
 const rows=(await r.json()).values||[];
 const headers=(rows.shift()||[]).map(s=>String(s).toLowerCase());
 const index=s=>headers.findIndex(h=>h.includes(s));
 if(index('chave ug')<0||index('situação almox')<0)throw Error('Cabeçalhos da planilha inesperados');
 const get=(row,s)=>{const i=index(s);return i<0?'':String(row[i]||'').trim()};
 const items=rows.filter(r=>get(r,'chave ug')).map(r=>({key:get(r,'chave ug'),status:get(r,'situação almox'),deadline:get(r,'fim do prazo'),company:get(r,'empresa'),obs:get(r,'observação integral'),action:get(r,'próxima ação')}));
 res.status(200).json({items,updatedAt:new Date().toISOString()});
 }catch(e){console.error(e.message);res.status(503).json({error:e.message})}
};