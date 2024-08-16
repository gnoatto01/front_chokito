import Layout from "./layoutPrincipal";



export default function TelaDashboard() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-[#FF6F00]">Bem-vindo ao SuporteBIT</h1>
                    <p className="text-[#424242]">
                        Este sistema ajuda você a gerenciar toda a parte do seu suporte. Deixando ele mais funcional e simples. 
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                </div>
            </div>
        </Layout>
    );
}
