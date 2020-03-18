<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form @submit="onSubmitHandler">
                            <div class="form-group row">
                                <label
                                    for="email"
                                    class="col-md-4 col-form-label text-md-right"
                                    >E-Mail Address</label
                                >

                                <div class="col-md-6">
                                    <input
                                        id="email"
                                        type="email"
                                        class="form-control"
                                        autocomplete="email"
                                        autofocus
                                        v-model="user.email"
                                        :class="{ 'is-invalid': errors.email }"
                                    />
                                    <span
                                        class="invalid-feedback"
                                        v-if="errors.email"
                                        >{{ errors.email[0] }}</span
                                    >
                                </div>
                            </div>

                            <div class="form-group row">
                                <label
                                    for="password"
                                    class="col-md-4 col-form-label text-md-right"
                                    >Password</label
                                >

                                <div class="col-md-6">
                                    <input
                                        id="password"
                                        type="password"
                                        class="form-control"
                                        autocomplete="current-password"
                                        v-model="user.password"
                                        :class="{
                                            'is-invalid': errors.password
                                        }"
                                    />
                                    <span
                                        class="invalid-feedback"
                                        v-if="errors.password"
                                        >{{ errors.password[0] }}</span
                                    >
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                        :disabled="loading"
                                    >
                                        <template v-if="loading">
                                            <div
                                                class="spinner-border"
                                                role="status"
                                            >
                                                <span class="sr-only"
                                                    >Loading...</span
                                                >
                                            </div>
                                        </template>
                                        <template v-else>Login</template>
                                    </button>

                                    <router-link
                                        class="btn btn-link"
                                        to="/forgot-password"
                                        >Forgot Your Password?</router-link
                                    >
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Login",
    mounted() {
        this.removeAllErrors();
    },
    computed: {
        ...mapGetters({
            loading: "auth/loading",
            errors: "auth/errors"
        })
    },
    data() {
        return {
            user: {
                emaill: "",
                password: ""
            }
        };
    },
    methods: {
        ...mapActions({
            loginUser: "auth/loginUser",
            removeAllErrors: "auth/removeAllErrors"
        }),
        onSubmitHandler(e) {
            e.preventDefault();
            this.loginUser(this.user);
        }
    }
};
</script>

<style lang="css"></style>
