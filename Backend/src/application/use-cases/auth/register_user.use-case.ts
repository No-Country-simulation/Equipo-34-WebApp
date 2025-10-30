import { user_already_exist_exception } from "../../../domain/exceptions/auth/user_already_exist.exception";
import type { auth_repository } from "../../../domain/repositories/auth/auth.repository";
import type { patient_repository } from "../../../domain/repositories/patient/patient.repository";
import type { user_repository } from "../../../domain/repositories/user/user.repository";
import type { register_user_dto } from "../../dto/User/auth.dto";
import { hash_password_service } from "../../services/auth/hash_password.service";
import { confirm_register } from "../../services/email/confirm-register.service";
import { create_token } from "../../services/verification/create-token.service";
import { search_user } from "../../services/user/search_user_by_email.service";

export class register_user_use_case {
  private readonly repository: auth_repository;
  private readonly user_repo: user_repository;
  private readonly patient_repo: patient_repository;
  private readonly create_token_service;
  private readonly exist_user;

  constructor(
    repository_injection: auth_repository,
    user_repository: user_repository,
    patient_repository_injection: patient_repository
  ) {
    this.repository = repository_injection;
    this.user_repo = user_repository;
    this.patient_repo = patient_repository_injection;
    this.create_token_service = new create_token();
    this.exist_user = new search_user(this.user_repo);
  }

  async run(user_data: register_user_dto) {
    const exist_user = await this.exist_user.run(user_data.email);

    if (exist_user) {
      throw new user_already_exist_exception();
    }

    const hasher = new hash_password_service(user_data.password);
    const hashed_password = await hasher.run();

    const new_user = await this.repository.register({
      ...user_data,
      password: hashed_password,
    });

    console.log("Aquí debe ir el usuario");
    console.log(new_user);
    const token = await this.create_token_service.run(new_user);
    const mailer = new confirm_register(user_data.email, token);
    const email = await mailer.run();

    if (new_user.role == "PATIENT") {
      await this.patient_repo.create_patient(new_user.id);
    }
    return { new_user, email };
  }
}
