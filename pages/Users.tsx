
import React, { useState } from 'react';
import { 
  Users as UsersIcon, UserPlus, Search, Filter, MoreVertical, 
  Edit, Trash2, Shield, Mail, CheckCircle, XCircle, Lock, 
  Eye, Save, X, UserCog, Activity 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Tooltip } from '../components/ui';

// --- Types & Mock Data ---

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Analista' | 'Visualizador';
  status: 'Ativo' | 'Inativo';
  avatarUrl?: string;
  lastLogin: string;
  department: string;
}

const MOCK_USERS_DATA: User[] = [
  { 
    id: '1', 
    name: 'Admin Silva', 
    email: 'admin@olhovivo.com', 
    role: 'Admin', 
    status: 'Ativo', 
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', 
    lastLogin: 'Hoje, 10:42',
    department: 'Diretoria'
  },
  { 
    id: '2', 
    name: 'Roberta Analista', 
    email: 'roberta@olhovivo.com', 
    role: 'Analista', 
    status: 'Ativo', 
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', 
    lastLogin: 'Ontem, 18:30',
    department: 'Inteligência'
  },
  { 
    id: '3', 
    name: 'João Vendas', 
    email: 'joao.v@olhovivo.com', 
    role: 'Visualizador', 
    status: 'Inativo', 
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', 
    lastLogin: '3 dias atrás',
    department: 'Comercial'
  },
  { 
    id: '4', 
    name: 'Carla Tech', 
    email: 'carla.dev@olhovivo.com', 
    role: 'Admin', 
    status: 'Ativo', 
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', 
    lastLogin: 'Hoje, 08:00',
    department: 'TI'
  },
  { 
    id: '5', 
    name: 'Marcos Gestor', 
    email: 'marcos@olhovivo.com', 
    role: 'Analista', 
    status: 'Ativo', 
    lastLogin: '5 min atrás',
    department: 'Marketing'
  },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<User>>({});
  const [viewMode, setViewMode] = useState(false); // Read-only mode for modal

  // --- Handlers ---

  const handleSave = () => {
    if (!editingUser.name || !editingUser.email || !editingUser.role) {
        return alert("Nome, Email e Função são obrigatórios.");
    }

    if (editingUser.id) {
        // Edit
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...editingUser } as User : u));
    } else {
        // Create
        const newUser: User = {
            id: Date.now().toString(),
            name: editingUser.name,
            email: editingUser.email,
            role: editingUser.role || 'Visualizador',
            status: editingUser.status || 'Ativo',
            avatarUrl: editingUser.avatarUrl,
            department: editingUser.department || 'Geral',
            lastLogin: 'Nunca'
        };
        setUsers([newUser, ...users]);
    }
    setIsModalOpen(false);
    setEditingUser({});
    setViewMode(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário? O acesso será revogado imediatamente.')) {
        setUsers(users.filter(u => u.id !== id));
    }
  };

  const openCreateModal = () => {
      setEditingUser({ status: 'Ativo', role: 'Visualizador' });
      setViewMode(false);
      setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
      setEditingUser(user);
      setViewMode(false);
      setIsModalOpen(true);
  };

  const openViewModal = (user: User) => {
      setEditingUser(user);
      setViewMode(true);
      setIsModalOpen(true);
  };

  const filteredUsers = users.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Components Helpers ---

  const getRoleBadge = (role: string) => {
      switch (role) {
          case 'Admin': return <Badge className="bg-purple-900/50 text-purple-300 border-purple-700 hover:bg-purple-900/70">Admin</Badge>;
          case 'Analista': return <Badge className="bg-blue-900/50 text-blue-300 border-blue-700 hover:bg-blue-900/70">Analista</Badge>;
          default: return <Badge variant="outline" className="text-slate-400">Visualizador</Badge>;
      }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <UsersIcon className="w-6 h-6 text-brand" />
            Gestão de Usuários
          </h2>
          <p className="text-slate-400">Controle de acesso, permissões e perfis da equipe.</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-brand/20" onClick={openCreateModal}>
            <UserPlus className="w-4 h-4" /> Novo Usuário
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-dark-surface border-dark-border">
              <CardContent className="pt-6 flex justify-between items-center">
                  <div>
                      <div className="text-sm text-slate-400">Total Usuários</div>
                      <div className="text-2xl font-bold text-white">{users.length}</div>
                  </div>
                  <div className="p-2 bg-slate-800 rounded-lg text-slate-300"><UsersIcon className="w-5 h-5"/></div>
              </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border">
              <CardContent className="pt-6 flex justify-between items-center">
                  <div>
                      <div className="text-sm text-slate-400">Ativos Agora</div>
                      <div className="text-2xl font-bold text-green-400">2</div>
                  </div>
                  <div className="p-2 bg-green-900/20 rounded-lg text-green-400"><Activity className="w-5 h-5"/></div>
              </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border">
              <CardContent className="pt-6 flex justify-between items-center">
                  <div>
                      <div className="text-sm text-slate-400">Admins</div>
                      <div className="text-2xl font-bold text-purple-400">{users.filter(u => u.role === 'Admin').length}</div>
                  </div>
                  <div className="p-2 bg-purple-900/20 rounded-lg text-purple-400"><Shield className="w-5 h-5"/></div>
              </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border">
              <CardContent className="pt-6 flex justify-between items-center">
                  <div>
                      <div className="text-sm text-slate-400">Novos (Mês)</div>
                      <div className="text-2xl font-bold text-brand">1</div>
                  </div>
                  <div className="p-2 bg-brand/10 rounded-lg text-brand"><UserPlus className="w-5 h-5"/></div>
              </CardContent>
          </Card>
      </div>

      {/* Filter & Table */}
      <Card className="bg-dark-surface border-dark-border">
          <CardHeader className="pb-4 border-b border-dark-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Membros da Equipe</CardTitle>
                  <div className="flex gap-2">
                      <div className="relative w-full md:w-64">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                          <Input 
                              placeholder="Buscar por nome, email..." 
                              className="pl-9 h-10 bg-slate-900"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                          />
                      </div>
                      <Button variant="outline" size="icon" className="h-10 w-10 text-slate-400">
                          <Filter className="w-4 h-4" />
                      </Button>
                  </div>
              </div>
          </CardHeader>
          
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/50 text-slate-400 border-b border-dark-border">
                      <tr>
                          <th className="px-6 py-4 font-medium">Usuário</th>
                          <th className="px-6 py-4 font-medium">Email / Depto</th>
                          <th className="px-6 py-4 font-medium">Função</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium">Último Acesso</th>
                          <th className="px-6 py-4 font-medium text-right">Ações</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                      {filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                              <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                                          {user.avatarUrl ? (
                                              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                          ) : (
                                              <span className="text-slate-400 font-bold text-sm">{user.name.charAt(0)}</span>
                                          )}
                                      </div>
                                      <div className="font-medium text-white">{user.name}</div>
                                  </div>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="text-slate-200 flex items-center gap-2">
                                      <Mail className="w-3 h-3 text-slate-500" /> {user.email}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-1 pl-5">{user.department}</div>
                              </td>
                              <td className="px-6 py-4">
                                  {getRoleBadge(user.role)}
                              </td>
                              <td className="px-6 py-4">
                                  <div className={`flex items-center gap-2 text-xs font-medium ${user.status === 'Ativo' ? 'text-green-400' : 'text-red-400'}`}>
                                      {user.status === 'Ativo' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                      {user.status}
                                  </div>
                              </td>
                              <td className="px-6 py-4 text-xs text-slate-500">
                                  {user.lastLogin}
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <div className="flex justify-end gap-2">
                                      <Tooltip content="Ver Detalhes">
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700" onClick={() => openViewModal(user)}>
                                              <Eye className="w-4 h-4 text-slate-400" />
                                          </Button>
                                      </Tooltip>
                                      <Tooltip content="Editar">
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-700" onClick={() => openEditModal(user)}>
                                              <Edit className="w-4 h-4 text-blue-400" />
                                          </Button>
                                      </Tooltip>
                                      <Tooltip content="Excluir">
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-900/20" onClick={() => handleDelete(user.id)}>
                                              <Trash2 className="w-4 h-4 text-red-400" />
                                          </Button>
                                      </Tooltip>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              {filteredUsers.length === 0 && (
                  <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                      <Search className="w-12 h-12 mb-3 opacity-20" />
                      <p>Nenhum usuário encontrado com os filtros atuais.</p>
                  </div>
              )}
          </div>
      </Card>

      {/* --- Modal: Create/Edit/View --- */}
      {isModalOpen && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg" style={{top: 0, height: '100vh', position: 'fixed', left: 0}}>
              <Card className="w-full max-w-2xl bg-dark-surface border-dark-border shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                  <CardHeader className="border-b border-dark-border pb-4 flex flex-row justify-between items-center shrink-0">
                      <CardTitle className="flex items-center gap-2">
                          {viewMode ? <Eye className="w-5 h-5 text-brand"/> : <UserCog className="w-5 h-5 text-brand"/>}
                          {viewMode ? 'Detalhes do Usuário' : editingUser.id ? 'Editar Usuário' : 'Novo Usuário'}
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></Button>
                  </CardHeader>
                  
                  <CardContent className="pt-6 flex-1 overflow-y-auto custom-scrollbar">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Left: Avatar */}
                          <div className="flex flex-col items-center gap-4">
                              <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 overflow-hidden flex items-center justify-center relative group">
                                  {editingUser.avatarUrl ? (
                                      <img src={editingUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                  ) : (
                                      <UsersIcon className="w-12 h-12 text-slate-500" />
                                  )}
                                  {!viewMode && (
                                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                          <span className="text-xs text-white">Alterar Foto</span>
                                      </div>
                                  )}
                              </div>
                              {!viewMode && (
                                  <div className="w-full">
                                      <label className="text-xs font-medium text-slate-400 mb-1 block">URL da Foto</label>
                                      <Input 
                                          placeholder="https://..." 
                                          value={editingUser.avatarUrl || ''}
                                          onChange={(e) => setEditingUser({...editingUser, avatarUrl: e.target.value})}
                                          className="text-xs h-8"
                                      />
                                  </div>
                              )}
                          </div>

                          {/* Right: Form Fields */}
                          <div className="md:col-span-2 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="col-span-2">
                                      <label className="text-xs font-medium text-slate-400 mb-1 block">Nome Completo *</label>
                                      <Input 
                                          placeholder="Ex: João da Silva" 
                                          value={editingUser.name || ''}
                                          onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                          disabled={viewMode}
                                      />
                                  </div>
                                  <div className="col-span-2">
                                      <label className="text-xs font-medium text-slate-400 mb-1 block">E-mail Corporativo *</label>
                                      <Input 
                                          type="email"
                                          placeholder="usuario@empresa.com" 
                                          value={editingUser.email || ''}
                                          onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                          disabled={viewMode}
                                      />
                                  </div>
                                  <div>
                                      <label className="text-xs font-medium text-slate-400 mb-1 block">Departamento</label>
                                      <Input 
                                          placeholder="Ex: Vendas" 
                                          value={editingUser.department || ''}
                                          onChange={(e) => setEditingUser({...editingUser, department: e.target.value})}
                                          disabled={viewMode}
                                      />
                                  </div>
                                  <div>
                                      <label className="text-xs font-medium text-slate-400 mb-1 block">Função / Permissão *</label>
                                      <select 
                                          className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50"
                                          value={editingUser.role || 'Visualizador'}
                                          onChange={(e) => setEditingUser({...editingUser, role: e.target.value as any})}
                                          disabled={viewMode}
                                      >
                                          <option value="Admin">Administrador (Acesso Total)</option>
                                          <option value="Analista">Analista (Editar/Criar)</option>
                                          <option value="Visualizador">Visualizador (Apenas Leitura)</option>
                                      </select>
                                  </div>
                                  
                                  <div>
                                      <label className="text-xs font-medium text-slate-400 mb-1 block">Status</label>
                                      <select 
                                          className="w-full h-10 bg-dark-bg border border-dark-border rounded-md px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50"
                                          value={editingUser.status || 'Ativo'}
                                          onChange={(e) => setEditingUser({...editingUser, status: e.target.value as any})}
                                          disabled={viewMode}
                                      >
                                          <option value="Ativo">Ativo</option>
                                          <option value="Inativo">Inativo (Bloqueado)</option>
                                      </select>
                                  </div>

                                  {/* Password Field only for Edit/Create (Mock) */}
                                  {!viewMode && (
                                      <div>
                                          <label className="text-xs font-medium text-slate-400 mb-1 block flex items-center gap-1">
                                              Senha <Lock className="w-3 h-3"/>
                                          </label>
                                          <Input 
                                              type="password"
                                              placeholder={editingUser.id ? "****** (Manter atual)" : "Definir senha provisória"} 
                                              disabled={viewMode}
                                          />
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
                  </CardContent>

                  <div className="p-4 border-t border-dark-border bg-dark-surface shrink-0 flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                          {viewMode ? 'Fechar' : 'Cancelar'}
                      </Button>
                      {!viewMode && (
                          <Button onClick={handleSave} className="gap-2">
                              <Save className="w-4 h-4" /> Salvar Usuário
                          </Button>
                      )}
                  </div>
              </Card>
          </div>
      )}
    </div>
  );
};

export default UsersPage;
