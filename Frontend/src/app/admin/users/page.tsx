'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { useTranslations } from '@/shared/hooks/useTranslations';
import type { User } from '@/shared/types/auth.types';

export default function UsersPage() {
  const router = useRouter();
  const t = useTranslations();
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          👥 {t('admin.users.title')}
        </h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            onClick={() => router.push('/dashboard')}
            className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            ← {t('admin.users.back')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Tabla de usuarios */}
        <div className="col-span-2">
          {loading ? (
            <div className="text-center text-gray-500 dark:text-gray-400">{t('admin.users.loading')}</div>
          ) : users.length === 0 ? (
            <div className="rounded-md bg-blue-50 dark:bg-blue-900/30 p-4">
              <p className="text-blue-800 dark:text-blue-200">📭 {t('admin.users.empty')}</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="w-full border-collapse bg-white dark:bg-gray-800">
                <thead className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">{t('admin.users.table.name')}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">{t('admin.users.table.email')}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">{t('admin.users.table.role')}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">{t('admin.users.table.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        {user.name} {user.last_name}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
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
                            ? t('admin.users.table.roles.patient')
                            : user.role === 'medico'
                            ? t('admin.users.table.roles.doctor')
                            : t('admin.users.table.roles.admin')}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm space-x-2">
                        <button
                          onClick={() => handleViewDetails(user)}
                          className="inline-flex px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-medium"
                        >
                          {t('admin.users.table.actionButtons.view')}
                        </button>
                        <button
                          onClick={() => handleDelete(user.email)}
                          className="inline-flex px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition text-xs font-medium"
                        >
                          {t('admin.users.table.actionButtons.delete')}
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
            <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md transition-colors">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold dark:text-white">{t('admin.users.details.title')}</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {t('admin.users.details.close')}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.edit.name')}</label>
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 text-sm"
                    />
                  </div>

                  {/* Apellido */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.edit.lastname')}</label>
                    <input
                      type="text"
                      value={editData.last_name || ''}
                      onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
                      className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.edit.email')}</label>
                    <input
                      type="email"
                      value={editData.email || ''}
                      disabled
                      className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-300 px-2 py-1 text-sm"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.edit.phone')}</label>
                    <input
                      type="tel"
                      value={editData.phone || ''}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 text-sm"
                    />
                  </div>

                  {/* Botones */}
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={handleSaveEdit}
                      className="w-full rounded bg-green-600 dark:bg-green-500 px-3 py-2 text-white text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 transition"
                    >
                      {t('admin.users.details.edit.save')}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-full rounded bg-gray-300 dark:bg-gray-600 px-3 py-2 text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                    >
                      {t('admin.users.details.edit.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Datos en modo visualización */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.labels.name')}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedUser.name}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.labels.lastname')}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedUser.last_name}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.labels.email')}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white break-all">{selectedUser.email}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.labels.phone')}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedUser.phone}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.labels.role')}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{selectedUser.role}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.labels.id')}</p>
                    <p className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">{selectedUser.id}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.labels.created')}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
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
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-700">
                      <p className="text-xs font-semibold text-yellow-900 dark:text-yellow-200 mb-2">{t('admin.users.details.password.title')}</p>
                      <div className="space-y-2">
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder={t('admin.users.details.password.new')}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 pr-8 text-xs placeholder:text-gray-400 dark:placeholder:text-gray-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xs"
                            title={showNewPassword ? t('admin.users.details.password.hide') : t('admin.users.details.password.show')}
                          >
                            {showNewPassword ? '🙈' : '👁️'}
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder={t('admin.users.details.password.confirm')}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 pr-8 text-xs placeholder:text-gray-400 dark:placeholder:text-gray-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xs"
                            title={showConfirmPassword ? t('admin.users.details.password.hide') : t('admin.users.details.password.show')}
                          >
                            {showConfirmPassword ? '🙈' : '👁️'}
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdatePassword}
                            className="flex-1 rounded bg-green-600 dark:bg-green-500 px-2 py-1 text-white text-xs font-medium hover:bg-green-700 dark:hover:bg-green-600"
                          >
                            {t('admin.users.details.password.save')}
                          </button>
                          <button
                            onClick={() => {
                              setIsEditingPassword(false);
                              setNewPassword('');
                              setConfirmPassword('');
                              setShowNewPassword(false);
                              setShowConfirmPassword(false);
                            }}
                            className="flex-1 rounded bg-gray-300 dark:bg-gray-600 px-2 py-1 text-gray-900 dark:text-white text-xs font-medium hover:bg-gray-400 dark:hover:bg-gray-500"
                          >
                            {t('admin.users.details.password.cancel')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.labels.password')}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                          {showPassword ? userPassword : '••••••••'}
                        </p>
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                        >
                          {showPassword ? t('admin.users.details.password.hide') : t('admin.users.details.password.show')}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Rol */}
                  {isEditingRole ? (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-700">
                      <p className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-2">{t('admin.users.details.role.title')}</p>
                      <div className="space-y-2">
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value as 'paciente' | 'medico' | 'admin')}
                          className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 text-xs"
                        >
                          <option value="paciente">{t('admin.users.details.role.patient')}</option>
                          <option value="medico">{t('admin.users.details.role.doctor')}</option>
                          <option value="admin">{t('admin.users.details.role.admin')}</option>
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdateRole}
                            className="flex-1 rounded bg-green-600 dark:bg-green-500 px-2 py-1 text-white text-xs font-medium hover:bg-green-700 dark:hover:bg-green-600"
                          >
                            {t('admin.users.details.role.save')}
                          </button>
                          <button
                            onClick={() => {
                              setIsEditingRole(false);
                              setNewRole(selectedUser.role as 'paciente' | 'medico' | 'admin');
                            }}
                            className="flex-1 rounded bg-gray-300 dark:bg-gray-600 px-2 py-1 text-gray-900 dark:text-white text-xs font-medium hover:bg-gray-400 dark:hover:bg-gray-500"
                          >
                            {t('admin.users.details.role.cancel')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t('admin.users.details.labels.role')}</p>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${
                        selectedUser.role === 'admin' ? 'bg-red-600 dark:bg-red-500' :
                        selectedUser.role === 'medico' ? 'bg-green-600 dark:bg-green-500' :
                        'bg-blue-600 dark:bg-blue-500'
                      }`}>
                        {selectedUser.role === 'admin' ? t('admin.users.details.role.admin') :
                         selectedUser.role === 'medico' ? t('admin.users.details.role.doctor') :
                         t('admin.users.details.role.patient')}
                      </div>
                    </div>
                  )}

                  {/* Botones */}
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full rounded bg-indigo-600 dark:bg-indigo-500 px-3 py-2 text-white text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                    >
                      {t('admin.users.details.buttons.edit')}
                    </button>
                    <button
                      onClick={() => setIsEditingPassword(!isEditingPassword)}
                      className="w-full rounded bg-orange-600 dark:bg-orange-500 px-3 py-2 text-white text-sm font-medium hover:bg-orange-700 dark:hover:bg-orange-600 transition"
                    >
                      {isEditingPassword ? t('admin.users.details.password.cancelButton') : t('admin.users.details.buttons.changePassword')}
                    </button>
                    <button
                      onClick={() => setIsEditingRole(!isEditingRole)}
                      className="w-full rounded bg-blue-600 dark:bg-blue-500 px-3 py-2 text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                    >
                      {isEditingRole ? t('admin.users.details.role.cancelButton') : t('admin.users.details.buttons.changeRole')}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedUser.email)}
                      className="w-full rounded bg-red-600 dark:bg-red-500 px-3 py-2 text-white text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition"
                    >
                      {t('admin.users.details.buttons.delete')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('admin.users.selectUser')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.users.stats.total')}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.users.stats.patients')}</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {users.filter((u) => u.role === 'paciente').length}
          </p>
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.users.stats.doctors')}</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {users.filter((u) => u.role === 'medico').length}
          </p>
        </div>
      </div>
    </div>
  );
}
