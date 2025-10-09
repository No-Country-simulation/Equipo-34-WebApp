export interface auth_repository {
  register(user_data: create_user_dto): Promise<User>;
  login(user_data: log_user_dto): Promise<User>;
  update_user(correo: string, user_data: update_user_dto): Promise<User>;
}
