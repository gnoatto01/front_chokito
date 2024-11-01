import Link from "next/link";
import router, { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { FaClipboard, FaMailBulk, FaPowerOff, FaUser, FaSearch, FaShieldAlt, FaUserClock, FaFilePdf, FaBrain, FaCogs, FaDesktop, FaPuzzlePiece, FaCodeBranch, FaPlay } from "react-icons/fa";
import React, { ReactNode } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface LayoutProps {
    children: ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {

    const router = useRouter();

    const handleLogout = () => {
        destroyCookie(null, 'naturalbit.token');
        router.push('/login');
    };

    const home = () => {
        router.push('/app/paginaDashboard');
    };

    return (

        <div className="flex flex-col min-h-screen">
            {/* Menu Superior */}
            <header className="bg-[#eb8133] text-white p-4 flex justify-between items-center">
                <span onClick={home} className="text-xl font-bold cursor-pointer">SuporteBIT</span>
                <div className="flex items-center gap-4">
                    {/* <FaBell size={10} className="w-6 h-6 cursor-pointer hover:text-gray-400" />
                        <FaUser size={10} className="w-6 h-6 cursor-pointer hover:text-gray-400" /> */}
                    <button onClick={handleLogout} className="flex items-center gap-2  px-3 py-1 rounded-md text-sm font-medium">
                        <FaPowerOff size={16} />
                    </button>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Menu Lateral */}
                <aside className="bg-gray-800 text-gray-300 w-64 flex flex-col">
                    {/* Barra pesquisa */}
                    <div className="flex items-center bg-[#333333] rounded-md overflow-hidden">

                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="w-full px-4 py-2 bg-[#333333] text-gray-300 focus:outline-none"
                        />
                        <div className="px-4 py-2 text-gray-300">
                            <FaSearch />
                        </div>
                    </div>
                    {/* Links do Menu */}
                    <nav className="flex-1 p-4 space-y-2">
                        <Link href="/app/paginaContatos" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700">
                            <FaUser className="w-5 h-5" />
                            <span>Contatos</span>
                        </Link>
                        <Link href="/app/paginaAtividades" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700">
                            <FaUserClock className="w-5 h-5" />
                            <span>Atividades</span>
                        </Link>
                        <Link href="/app/paginaGerarContraSenha" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700">
                            <FaShieldAlt className="w-5 h-5" />
                            <span>Contra-senha</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700">
                            <FaMailBulk className="w-5 h-5" />
                            <span>Templates</span>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 transition duration-200">
                                    <FaClipboard className="w-5 h-5" />
                                    <span>Roteiros</span>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48 bg-gray-800 border border-gray-700 text-gray-300 rounded-md shadow-lg mt-2"
                                align="start"
                                sideOffset={5}
                            >
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition duration-200">
                                    <div onClick={() => router.push('/app/paginaSistema')} className="flex items-center gap-2">
                                        <FaDesktop />
                                        <span>Sistema</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition duration-200">
                                    <div className="flex items-center gap-2">
                                        <FaPuzzlePiece />
                                        <span>Módulo</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition duration-200">
                                    <div className="flex items-center gap-2">
                                        <FaCogs />
                                        <span>Teste</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition duration-200">
                                    <div className="flex items-center gap-2">
                                        <FaCodeBranch />
                                        <span>Versão</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition duration-200">
                                    <div className="flex items-center gap-2">
                                        <FaClipboard />
                                        <span>Resultado esperado</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition duration-200">
                                    <div className="flex items-center gap-2">
                                        <FaPlay />
                                        <span>Rodar teste</span>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700">
                            <FaFilePdf className="w-5 h-5" />
                            <span>Relatórios</span>
                        </Link>
                    </nav>
                </aside>

                {/* Conteúdo Principal */}
                <main className="flex-1 p-8 bg-[#F5F5F5]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
