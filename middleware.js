const {next}=require('@vercel/functions');
module.exports=function middleware(req){
 const user=process.env.APP_USERNAME,pass=process.env.APP_PASSWORD;
 if(!user||!pass)return new Response('Acesso desabilitado até configurar usuário e senha.',{status:503});
 const h=req.headers.get('authorization')||'';
 let actual='';try{if(h.startsWith('Basic '))actual=atob(h.slice(6))}catch{}
 if(actual!==user+':'+pass)return new Response('Autenticação necessária',{status:401,headers:{'WWW-Authenticate':'Basic realm="Central de Empenhos"','Cache-Control':'no-store'}});
 return next();
};
module.exports.config={matcher:['/((?!_next/|favicon.ico).*)']};