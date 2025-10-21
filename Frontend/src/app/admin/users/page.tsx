'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/shared/types/auth.types';

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [newRole, setNewRole] = useState<'paciente' | 'medico' | 'admin'>('paciente');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
        
        // Si hay un usuario seleccionado, actualizar con los nuevos datos
        if (selectedUser) {
          const updatedUser = (data.users || []).find((u: User) => u.email === selectedUser.email);
          if (updatedUser) {
            setSelectedUser(updatedUser);
            setEditData(updatedUser);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar a ${email}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Usuario eliminado correctamente');
        setSelectedUser(null);
        await fetchUsers();
      } else {
        alert('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error al eliminar usuario');
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(
        `/api/admin/users/${encodeURIComponent(selectedUser.email)}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert('Usuario actualizado correctamente');
        setIsEditing(false);
        setSelectedUser(data.user);
        await fetchUsers();
      } else {
        alert('Error al actualizar usuario');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error al actualizar usuario');
    }
  };

  const handleViewDetails = async (user: User) => {
    setSelectedUser(user);
    setEditData(user);
    setIsEditing(false);
    setIsEditingPassword(false);
    setIsEditingRole(false);
    setNewPassword('');
    setConfirmPassword('');
    setNewRole(user.role as 'paciente' | 'medico' | 'admin');
    setShowPassword(false);
    
    // Recuperar la contraseña del servidor
    try {
      const response = await fetch(
        `/api/admin/users/${encodeURIComponent(user.email)}/password`
      );
      if (response.ok) {
        const data = await response.json();
        setUserPassword(data.password);
      }
    } catch (error) {
      console.error('Error fetching password:', error);
      setUserPassword('••••••••');
    }
  };

  const handleUpdatePassword = async () => {
    if (!selectedUser) return;

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/users/${encodeURIComponent(selectedUser.email)}/password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (response.ok) {
        alert('Contraseña actualizada correctamente');
        setIsEditingPassword(false);
        setNewPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        
        // Actualizar la contraseña mostrada
        setUserPassword(newPassword);
        
        // Recargar la lista de usuarios
        await fetchUsers();
      } else {
        alert('Error al actualizar contraseña');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error al actualizar contraseña');
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(
        `/api/admin/users/${encodeURIComponent(selectedUser.email)}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert('Rol actualizado correctamente');
        setIsEditingRole(false);
        setSelectedUser(data.user);
        setEditData(data.user);
        setNewRole(data.user.role as 'paciente' | 'medico' | 'admin');
        await fetchUsers();
      } else {
        alert('Error al actualizar rol');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Error al actualizar rol');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          👥 Usuarios Registrados
        </h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
        >
          ← Volver
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Tabla de usuarios */}
        <div className="col-span-2">
          {loading ? (
            <div className="text-center text-gray-500">Cargando usuarios...</div>
          ) : users.length === 0 ? (
            <div className="rounded-md bg-blue-50 p-4">
              <p className="text-blue-800">📭 No hay usuarios registrados aún.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="w-full border-collapse bg-white">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rol</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-3 text-sm font-medium text-gray-900">
                        {user.name} {user.last_name}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-3 text-sm">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'paciente'
                              ? 'bg-blue-100 text-blue-800'
                              : user.role === 'medico'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {user.role === 'paciente'
                            ? '🏥 Paciente'
                            : user.role === 'medico'
                            ? '👨‍⚕️ Médico'
                            : '⚙️ Admin'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm space-x-2">
                        <button
                          onClick={() => handleViewDetails(user)}
                          className="inline-flex px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-medium"
                        >
                          👁️ Ver
                        </button>
                        <button
                          onClick={() => handleDelete(user.email)}
                          className="inline-flex px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition text-xs font-medium"
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Panel de detalles */}
        <div className="col-span-1">
          {selectedUser ? (
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">Detalles del Usuario</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Nombre</label>
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                  </div>

                  {/* Apellido */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Apellido</label>
                    <input
                      type="text"
                      value={editData.last_name || ''}
                      onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
                      className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Email</label>
                    <input
                      type="email"
                      value={editData.email || ''}
                      disabled
                      className="mt-1 block w-full rounded border border-gray-300 bg-gray-100 px-2 py-1 text-sm"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Teléfono</label>
                    <input
                      type="tel"
                      value={editData.phone || ''}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                  </div>

                  {/* Botones */}
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={handleSaveEdit}
                      className="w-full rounded bg-green-600 px-3 py-2 text-white text-sm font-medium hover:bg-green-700 transition"
                    >
                      ✓ Guardar
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-full rounded bg-gray-300 px-3 py-2 text-gray-900 text-sm font-medium hover:bg-gray-400 transition"
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Datos en modo visualización */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600">NOMBRE</p>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.name}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600">APELLIDO</p>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.last_name}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600">EMAIL</p>
                    <p className="text-sm font-medium text-gray-900 break-all">{selectedUser.email}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600">TELÉFONO</p>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.phone}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600">ROL</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{selectedUser.role}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600">ID</p>
                    <p className="text-xs font-mono text-gray-600 break-all">{selectedUser.id}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600">CREADO</p>
                    <p className="text-xs text-gray-600">
                      {new Date(selectedUser.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {/* Contraseña */}
                  {isEditingPassword ? (
                    <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                      <p className="text-xs font-semibold text-yellow-900 mb-2">🔐 Cambiar Contraseña</p>
                      <div className="space-y-2">
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full rounded border border-gray-300 px-2 py-1 pr-8 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs"
                            title={showNewPassword ? 'Ocultar' : 'Ver'}
                          >
                            {showNewPassword ? '🙈' : '👁️'}
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded border border-gray-300 px-2 py-1 pr-8 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs"
                            title={showConfirmPassword ? 'Ocultar' : 'Ver'}
                          >
                            {showConfirmPassword ? '🙈' : '👁️'}
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdatePassword}
                            className="flex-1 rounded bg-green-600 px-2 py-1 text-white text-xs font-medium hover:bg-green-700"
                          >
                            ✓ Guardar
                          </button>
                          <button
                            onClick={() => {
                              setIsEditingPassword(false);
                              setNewPassword('');
                              setConfirmPassword('');
                              setShowNewPassword(false);
                              setShowConfirmPassword(false);
                            }}
                            className="flex-1 rounded bg-gray-300 px-2 py-1 text-gray-900 text-xs font-medium hover:bg-gray-400"
                          >
                            ✕ Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-gray-600">CONTRASEÑA</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 font-mono">
                          {showPassword ? userPassword : '••••••••'}
                        </p>
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          {showPassword ? '🙈 Ocultar' : '👁️ Ver'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Rol */}
                  {isEditingRole ? (
                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs font-semibold text-blue-900 mb-2">👤 Cambiar Rol</p>
                      <div className="space-y-2">
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value as 'paciente' | 'medico' | 'admin')}
                          className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                        >
                          <option value="paciente">👤 Paciente</option>
                          <option value="medico">🏥 Médico</option>
                          <option value="admin">⚙️ Admin</option>
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdateRole}
                            className="flex-1 rounded bg-green-600 px-2 py-1 text-white text-xs font-medium hover:bg-green-700"
                          >
                            ✓ Guardar
                          </button>
                          <button
                            onClick={() => {
                              setIsEditingRole(false);
                              setNewRole(selectedUser.role as 'paciente' | 'medico' | 'admin');
                            }}
                            className="flex-1 rounded bg-gray-300 px-2 py-1 text-gray-900 text-xs font-medium hover:bg-gray-400"
                          >
                            ✕ Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-gray-600">ROL</p>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${
                        selectedUser.role === 'admin' ? 'bg-red-600' :
                        selectedUser.role === 'medico' ? 'bg-green-600' :
                        'bg-blue-600'
                      }`}>
                        {selectedUser.role === 'admin' ? '⚙️ Admin' :
                         selectedUser.role === 'medico' ? '🏥 Médico' :
                         '👤 Paciente'}
                      </div>
                    </div>
                  )}

                  {/* Botones */}
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full rounded bg-indigo-600 px-3 py-2 text-white text-sm font-medium hover:bg-indigo-700 transition"
                    >
                      ✏️ Editar Datos
                    </button>
                    <button
                      onClick={() => setIsEditingPassword(!isEditingPassword)}
                      className="w-full rounded bg-orange-600 px-3 py-2 text-white text-sm font-medium hover:bg-orange-700 transition"
                    >
                      🔐 {isEditingPassword ? 'Cancelar' : 'Cambiar Contraseña'}
                    </button>
                    <button
                      onClick={() => setIsEditingRole(!isEditingRole)}
                      className="w-full rounded bg-blue-600 px-3 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                      👤 {isEditingRole ? 'Cancelar' : 'Cambiar Rol'}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedUser.email)}
                      className="w-full rounded bg-red-600 px-3 py-2 text-white text-sm font-medium hover:bg-red-700 transition"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-100 p-6 text-center">
              <p className="text-sm text-gray-600">Selecciona un usuario para ver los detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">Total de usuarios</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">Pacientes</p>
          <p className="text-2xl font-bold text-blue-600">
            {users.filter((u) => u.role === 'paciente').length}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">Médicos</p>
          <p className="text-2xl font-bold text-green-600">
            {users.filter((u) => u.role === 'medico').length}
          </p>
        </div>
      </div>
    </div>
  );
}
