/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { user_controller } from './../controllers/user/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { role_controller } from './../controllers/role/role.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { permission_controller } from './../controllers/permission/permission.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { server_health } from './../controllers/health/health.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { auth_controller } from './../controllers/auth/auth.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Role": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "role_name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "permissions_id": {"dataType":"double","required":true},
            "permission": {"ref":"Permission"},
            "users": {"dataType":"array","array":{"dataType":"refObject","ref":"User"}},
            "created_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Permission": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "roles": {"dataType":"array","array":{"dataType":"refObject","ref":"Role"}},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "last_name": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "emergency_contact": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "two_factor_auth": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "role_id": {"dataType":"double","required":true},
            "role": {"ref":"Role"},
            "created_at": {"dataType":"datetime","required":true},
            "updated_at": {"dataType":"datetime"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pagination": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double","required":true},
            "page": {"dataType":"double","required":true},
            "limit": {"dataType":"double","required":true},
            "total_pages": {"dataType":"double","required":true},
            "hasNextPage": {"dataType":"boolean","required":true},
            "hasPrevPage": {"dataType":"boolean","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "create_role_dto": {
        "dataType": "refObject",
        "properties": {
            "role_name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "permissions_id": {"dataType":"double","required":true},
            "created_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "create_permission_dto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "register_user_dto": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "last_name": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "emergency_contact": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "two_factor_auth": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "role_id": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "update_user_dto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "last_name": {"dataType":"string"},
            "email": {"dataType":"string"},
            "password": {"dataType":"string"},
            "phone": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsuser_controller_get_users: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","required":true,"dataType":"double"},
                limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
        };
        app.get('/user',
            ...(fetchMiddlewares<RequestHandler>(user_controller)),
            ...(fetchMiddlewares<RequestHandler>(user_controller.prototype.get_users)),

            async function user_controller_get_users(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsuser_controller_get_users, request, response });

                const controller = new user_controller();

              await templateService.apiHandler({
                methodName: 'get_users',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsuser_controller_search: Record<string, TsoaRoute.ParameterSchema> = {
                email: {"in":"path","name":"email","required":true,"dataType":"string"},
        };
        app.get('/user/:email',
            ...(fetchMiddlewares<RequestHandler>(user_controller)),
            ...(fetchMiddlewares<RequestHandler>(user_controller.prototype.search)),

            async function user_controller_search(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsuser_controller_search, request, response });

                const controller = new user_controller();

              await templateService.apiHandler({
                methodName: 'search',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsrole_controller_get_roles: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","required":true,"dataType":"double"},
                limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
        };
        app.get('/role',
            ...(fetchMiddlewares<RequestHandler>(role_controller)),
            ...(fetchMiddlewares<RequestHandler>(role_controller.prototype.get_roles)),

            async function role_controller_get_roles(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsrole_controller_get_roles, request, response });

                const controller = new role_controller();

              await templateService.apiHandler({
                methodName: 'get_roles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsrole_controller_search_roles: Record<string, TsoaRoute.ParameterSchema> = {
                role_id: {"in":"path","name":"role_id","required":true,"dataType":"double"},
        };
        app.get('/role/:role_id',
            ...(fetchMiddlewares<RequestHandler>(role_controller)),
            ...(fetchMiddlewares<RequestHandler>(role_controller.prototype.search_roles)),

            async function role_controller_search_roles(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsrole_controller_search_roles, request, response });

                const controller = new role_controller();

              await templateService.apiHandler({
                methodName: 'search_roles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsrole_controller_create_role: Record<string, TsoaRoute.ParameterSchema> = {
                role_data: {"in":"body","name":"role_data","required":true,"ref":"create_role_dto"},
        };
        app.post('/role/new',
            ...(fetchMiddlewares<RequestHandler>(role_controller)),
            ...(fetchMiddlewares<RequestHandler>(role_controller.prototype.create_role)),

            async function role_controller_create_role(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsrole_controller_create_role, request, response });

                const controller = new role_controller();

              await templateService.apiHandler({
                methodName: 'create_role',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsrole_controller_update_role: Record<string, TsoaRoute.ParameterSchema> = {
                role_id: {"in":"path","name":"role_id","required":true,"dataType":"double"},
                role_data: {"in":"body","name":"role_data","required":true,"ref":"create_role_dto"},
        };
        app.put('/role/:role_id',
            ...(fetchMiddlewares<RequestHandler>(role_controller)),
            ...(fetchMiddlewares<RequestHandler>(role_controller.prototype.update_role)),

            async function role_controller_update_role(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsrole_controller_update_role, request, response });

                const controller = new role_controller();

              await templateService.apiHandler({
                methodName: 'update_role',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsrole_controller_delete_role: Record<string, TsoaRoute.ParameterSchema> = {
                role_id: {"in":"path","name":"role_id","required":true,"dataType":"double"},
        };
        app.delete('/role/:role_id',
            ...(fetchMiddlewares<RequestHandler>(role_controller)),
            ...(fetchMiddlewares<RequestHandler>(role_controller.prototype.delete_role)),

            async function role_controller_delete_role(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsrole_controller_delete_role, request, response });

                const controller = new role_controller();

              await templateService.apiHandler({
                methodName: 'delete_role',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argspermission_controller_get_permissions: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","required":true,"dataType":"double"},
                limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
        };
        app.get('/permission',
            ...(fetchMiddlewares<RequestHandler>(permission_controller)),
            ...(fetchMiddlewares<RequestHandler>(permission_controller.prototype.get_permissions)),

            async function permission_controller_get_permissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argspermission_controller_get_permissions, request, response });

                const controller = new permission_controller();

              await templateService.apiHandler({
                methodName: 'get_permissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argspermission_controller_search_permission: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/permission/:id',
            ...(fetchMiddlewares<RequestHandler>(permission_controller)),
            ...(fetchMiddlewares<RequestHandler>(permission_controller.prototype.search_permission)),

            async function permission_controller_search_permission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argspermission_controller_search_permission, request, response });

                const controller = new permission_controller();

              await templateService.apiHandler({
                methodName: 'search_permission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argspermission_controller_create_permission: Record<string, TsoaRoute.ParameterSchema> = {
                permission_data: {"in":"body","name":"permission_data","required":true,"ref":"create_permission_dto"},
        };
        app.post('/permission/new',
            ...(fetchMiddlewares<RequestHandler>(permission_controller)),
            ...(fetchMiddlewares<RequestHandler>(permission_controller.prototype.create_permission)),

            async function permission_controller_create_permission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argspermission_controller_create_permission, request, response });

                const controller = new permission_controller();

              await templateService.apiHandler({
                methodName: 'create_permission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argspermission_controller_update_permission: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                permission_data: {"in":"body","name":"permission_data","required":true,"ref":"create_permission_dto"},
        };
        app.put('/permission/:id',
            ...(fetchMiddlewares<RequestHandler>(permission_controller)),
            ...(fetchMiddlewares<RequestHandler>(permission_controller.prototype.update_permission)),

            async function permission_controller_update_permission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argspermission_controller_update_permission, request, response });

                const controller = new permission_controller();

              await templateService.apiHandler({
                methodName: 'update_permission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argspermission_controller_delete_permission: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/permission/:id',
            ...(fetchMiddlewares<RequestHandler>(permission_controller)),
            ...(fetchMiddlewares<RequestHandler>(permission_controller.prototype.delete_permission)),

            async function permission_controller_delete_permission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argspermission_controller_delete_permission, request, response });

                const controller = new permission_controller();

              await templateService.apiHandler({
                methodName: 'delete_permission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsserver_health_server_health_controller: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/health',
            ...(fetchMiddlewares<RequestHandler>(server_health)),
            ...(fetchMiddlewares<RequestHandler>(server_health.prototype.server_health_controller)),

            async function server_health_server_health_controller(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsserver_health_server_health_controller, request, response });

                const controller = new server_health();

              await templateService.apiHandler({
                methodName: 'server_health_controller',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsauth_controller_register: Record<string, TsoaRoute.ParameterSchema> = {
                user_data: {"in":"body","name":"user_data","required":true,"ref":"register_user_dto"},
        };
        app.post('/auth/register',
            ...(fetchMiddlewares<RequestHandler>(auth_controller)),
            ...(fetchMiddlewares<RequestHandler>(auth_controller.prototype.register)),

            async function auth_controller_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsauth_controller_register, request, response });

                const controller = new auth_controller();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsauth_controller_update: Record<string, TsoaRoute.ParameterSchema> = {
                email: {"in":"path","name":"email","required":true,"dataType":"string"},
                user_data: {"in":"body","name":"user_data","required":true,"ref":"update_user_dto"},
        };
        app.put('/auth/:email',
            ...(fetchMiddlewares<RequestHandler>(auth_controller)),
            ...(fetchMiddlewares<RequestHandler>(auth_controller.prototype.update)),

            async function auth_controller_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsauth_controller_update, request, response });

                const controller = new auth_controller();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsauth_controller_delete_user: Record<string, TsoaRoute.ParameterSchema> = {
                email: {"in":"path","name":"email","required":true,"dataType":"string"},
        };
        app.delete('/auth/:email',
            ...(fetchMiddlewares<RequestHandler>(auth_controller)),
            ...(fetchMiddlewares<RequestHandler>(auth_controller.prototype.delete_user)),

            async function auth_controller_delete_user(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsauth_controller_delete_user, request, response });

                const controller = new auth_controller();

              await templateService.apiHandler({
                methodName: 'delete_user',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
