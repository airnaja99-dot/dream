export const metadata={title:'Dream Log',description:'Shadow Dream Log'};
export default function RootLayout({children}:{children:React.ReactNode}){return(<html lang="th"><body style={{fontFamily:'system-ui',padding:16}}>
<nav style={{display:'flex',gap:12,marginBottom:16}}><a href="/">Home</a><a href="/dreams">Logs</a><a href="/dreams/new">New Log</a><a href="/login">Login</a><a href="/signup">Signup</a></nav>{children}</body></html>);}
