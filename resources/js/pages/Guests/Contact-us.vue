<template>
  <div class="container">
    <!-- Contact Section Heading -->
    <h2
      class="page-section-heading text-center text-uppercase text-secondary mb-0"
    >WELCOME TO NETCONTACTS SUPPORT DESK</h2>

    <div class="col-md-12 bg-color">
      <h6 class="mtb-15">
        <i class="fa fa-envelope" aria-hidden="true"></i> support@netcontacts.com.ng
      </h6>
      <!-- <h6 class="mtb-15">
        <i class="fa fa-whatsapp" aria-hidden="true"></i> 08137981072
      </h6>
      <h6 class="mtb-15">
        <i class="fa fa-phone" aria-hidden="true"></i> +23440534352, +2348037472464
      </h6>-->
    </div>

    <!-- Icon Divider -->
    <div class="divider-custom">
      <div class="divider-custom-line"></div>
      <div class="divider-custom-icon">
        <i class="fas fa-star"></i>
      </div>
      <div class="divider-custom-line"></div>
    </div>

    <div class="row justify-content-md-center">
      <div class="col-md-8">
        <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Contact Us</h2>
        <form @submit.prevent="onSubmitHandler" class="mtb-15">
          <div class="form-group row">
            <label for="staticName" class="col-sm-4 col-form-label">Name</label>
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control"
                id="staticName"
                v-model="user.name"
                :class="{'is-invalid': errors.name }"
              />
              <span class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</span>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-4 col-form-label">Email</label>
            <div class="col-sm-12">
              <input
                type="email"
                class="form-control"
                id="staticEmail"
                v-model="user.email"
                :class="{'is-invalid': errors.email }"
              />
              <span class="invalid-feedback" v-if="errors.name">{{ errors.email[0] }}</span>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticContactNumber" class="col-sm-4 col-form-label">Phone Number</label>
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control"
                id="staticContactNumber"
                v-model="user.contact_number"
                :class="{'is-invalid': errors.contact_number }"
              />
              <span class="invalid-feedback" v-if="errors.name">{{ errors.contact_number[0] }}</span>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticMembership" class="col-sm-4 col-form-label">Membership</label>
            <div class="col-sm-12">
              <select class="form-control" v-model="user.membership">
                <option value="Free">Free</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticInvitationCode" class="col-sm-4 col-form-label">Invitation Code</label>
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control"
                id="staticInvitationCode"
                v-model="user.invitation_code"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="staticMessage" class="col-sm-4 col-form-label">Message</label>
            <div class="col-sm-12">
              <textarea
                class="form-control"
                id="staticMessage"
                cols="30"
                rows="10"
                v-model="user.message"
                :class="{'is-invalid': errors.message }"
              ></textarea>
              <span class="invalid-feedback" v-if="errors.name">{{ errors.message[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col col-md-12">
              <button class="btn btn-lg btn-success wide-button" type="submit" :disabled="loading">
                <template v-if="loading">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </template>
                <template v-else>
                  <i class="fa fa-floppy-o" aria-hidden="true"></i> Submit
                </template>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Contact-us",
  computed: {
    ...mapGetters({
      loading: "loading",
      errors: "errors"
    })
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        contact_number: "",
        membership: "Free",
        invitation_code: "",
        message: ""
      }
    };
  },
  methods: {
    ...mapActions({
      contactUsRequest: "contactUsRequest"
    }),

    onSubmitHandler() {
      this.contactUsRequest(this.user).then(() => {
        this.user.name = "";
        this.user.email = "";
        this.user.contact_number = "";
        this.user.membership = "Free";
        this.user.invitation_code = "";
        this.user.message = "";
      });
    }
  }
};
</script>

<style lang="css" scoped>
/* @import "~/css/all.css"; */
/* @import "~/css/all.min.css"; */
/* @import "~/css/freelancer.min.css"; */

@import "~/public/css/all.min.css";
@import "~/public/css/freelancer.min.css";

h6 {
  font-size: 1.25rem;
}

.mtb-15 {
  margin: 15px 0px;
}

.wide-button {
  width: 100%;
}
</style>