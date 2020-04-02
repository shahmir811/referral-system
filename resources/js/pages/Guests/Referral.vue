<template>
  <section class="page-section bg-primary text-white mb-0 some-more" id="about" v-if="!loading">
    <div class="container">
      <!-- Referral Section Content -->
      <div class="row">
        <div class="col-lg-12 ml-auto">
          <p class="lead">
            I,
            <strong>{{ user.name }}</strong>, WELCOME to NetContacts Nigeria! A platform where a lots of Nigerians are making it big.
          </p>

          <p
            class="lead"
          >Netcontacts Nigeria is one of the first and finest Nigeria online money making platforms that have been in existence for years. The re-launched of Netcontacts Nigeria was born out of its online reputation and also the ease to making legitimate cash for problem solving; thereby giving Nigerians a better hope to achieve their financial goals within the shortest time. In other words, it’s a business you can do for a living or considered as passive income.</p>

          <p class="lead">
            Netcontacts Nigeria is not a ponzi scheme like MMM neither does both have similarity. Thus, Netcontacts Nigeria is an Online Empowerment Business that allows people to earn money from the comfort of their bedroom. NO central account for payment. It’s a meant for the following categories: Students, House Wives, Civil Servants, Employers of labour and the Unemployed. It’s 100% Money Making platform where you’re the real Boss.
            <strong>In NetContacts, everybody makes money</strong>.
          </p>

          <p class="lead">
            It’s a business platform where members (Active Members) are directly paid by the people that they invites/referred to the platform. Therefore the people you refer must register on the platform through your Referral link/Invitation code.
            <strong>What this means is that ONLY the person that you registered with through his/her Referral link/Invitation code can activate your account after you must have paid a token of N2,500 into his/her Bank Account as shown on your Dashboard after registration. Thus, everyone that joins through you must pay 2500 into your account.</strong>
          </p>

          <p class="lead">
            We therefore urge you, to pay
            <strong>N2,500</strong> to the person that invited you to register as Netcontacts member; so that you will be also paid, when you invite other people. It’s very important to know that the
            <strong>N2,500</strong> you’ll pay into the account of the person that invited is done once for life.
          </p>

          <p class="lead">
            <router-link to="/register">
              <strong>CLICK HERE</strong>
            </router-link>to register and use this invitation code
            <strong>{{ user.token }}</strong> during your registration
          </p>

          <h2 class="page-section-heading text-center text-uppercase text-white">How it works</h2>

          <!-- Icon Divider -->
          <div class="divider-custom divider-light">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-icon">
              <i class="fas fa-star"></i>
            </div>
            <div class="divider-custom-line"></div>
          </div>

          <p class="lead">
            The method is very simple,
            <strong>if you invite me, I pay you; if I invite other people, they pay me</strong>. The process is sowing and reaping. What you sow (N2500) you reap in unlimited folds. As a Free Membership you cannot invite other people to register under you until you migrate to
            <strong>"Paid Membership"</strong> by paying a token of
            <strong>N2,500</strong> membership activation fee to the person that invited you, before your account can become activate as
            <strong>Paid Membership</strong>. Thereafter it’s at this point you can now also invite others and be paid too.
          </p>

          <p class="lead">Mathematically, it’s very simple:</p>
          <p
            class="lead"
          >If you refer one (1) person and you’ll get paid N2,500 and there’s no limit to number of people you can invite as active members.</p>

          <ol>
            <li>1 person = N2,500</li>
            <li>5 people = N12,500</li>
            <li>10 people = N25,000</li>
            <li>20 people = N50,000</li>
            <li>100 people = N250,000</li>
            <li>1000 people = N2,500,000....etc That's how it goes.</li>
          </ol>
          <small>
            Note:- This is not a
            <strong>"Get Rich Quick"</strong> class, but a class of entrepreneur minds where only the effort of your hard work, bears seeds (reward) for you.
          </small>

          <p class="lead mt-20">
            <router-link to="/register">
              <strong>CLICK HERE</strong>
            </router-link>to register and use this invitation code
            <strong>{{ user.token }}</strong> during your registration
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Referral",
  mounted() {
    this.referralID = this.$route.query.referral;
    this.getUserData();
  },
  data() {
    return {
      loading: true,
      referralID: null,
      user: null
    };
  },
  computed: {
    ...mapGetters({
      rootURL: "rootURL"
    })
  },
  methods: {
    getUserData() {
      axios
        .get(`${this.rootURL}/getUser/${this.referralID}`)
        .then(response => {
          this.user = response.data.data.user;
          this.loading = false;
        })
        .catch(error => {
          console.log("Error: ", error);
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="css" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.some-more {
  margin-top: -50px;
  padding: 2rem 0;
}

.mt-20 {
  margin-top: 20px;
}
</style>