<template>
  <div>
    <h2>Step {{ currentStep }}</h2>

    <main class="form-signing w-50 m-auto">

      <!-- Step 1: Company Details -->
      <div v-if="currentStep === 1">
        <form @submit.prevent="handleSubmit">
          <h1 class="h3 mb-3 fw-normal">Form</h1>
          <Input label="Company Name" v-model="form.companyName" type="text" :min="min" :max="max"/>
          <Input label="Brand Name" v-model="form.brandName" type="text" :min="min" :max="max" />
          <Button type="submit">Next</Button>
        </form>
      </div>

      <!-- Step 2: Product Details -->
      <div v-if="currentStep === 2">
        <form @submit.prevent="handleSubmit">
          <h1 class="h3 mb-3 fw-normal">Form</h1>
          <div class="mb-3">
            <label for="type" class="form-label">Type:</label>
            <select id="type" v-model="form.type" class="form-select" >
              <option disabled value="">Select a type</option>
              <option v-for="type in options.types" :key="type">{{ type }}</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="product" class="form-label">Products:</label>
            <select id="product" v-model="form.product" class="form-select" >
              <option disabled value="">Select a product</option>
              <option v-for="product in options.products" :key="product">{{ product }}</option>
            </select>
          </div>
          <Input label="Quantity" v-model="form.quantity" type="number" :min="min" :max="max" />
          <Input label="Price" v-model="form.price" type="number" :min="min" :max="max"/>
          <Input label="Total Calculation" v-model="form.totalCalculation" type="text" readonly />
          <Button type="submit">Next</Button>
        </form>
      </div>

      <!-- Step 3: Personal Details -->
      <div v-if="currentStep === 3">
        <form @submit.prevent="handleSubmit">
          <h1 class="h3 mb-3 fw-normal">Form</h1>
          <div class="mb-3">
            <label for="country" class="form-label">Country:</label>
            <select id="country" v-model="form.country" class="form-select" >
              <option disabled value="">Select a country</option>
              <option v-for="country in options.countries" :key="country">{{ country }}</option>
            </select>
          </div>
          <Input label="Age" v-model="form.age" type="number" :min="min" :max="max" />
          <div class="mb-3">
            <label for="gender" class="form-label">Gender:</label>
            <select id="gender" v-model="form.gender" class="form-select" >
              <option disabled value="">Select a gender</option>
              <option v-for="gender in options.genders" :key="gender">{{ gender }}</option>
            </select>
          </div>
          <Button type="submit">Next</Button>
        </form>
      </div>

      <!-- Step 4: Upload Image and Description -->
      <div v-if="currentStep === 4">
        <form @submit.prevent="handleSubmit">
          <h1 class="h3 mb-3 fw-normal">Form</h1>

          <!-- Image Upload Section -->
          <div class="mb-3">
            <label for="imageUpload" class="form-label">Upload Image</label>
            <input
                id="imageUpload"
                type="file"
                @change="handleImageUpload"
                class="form-control"
                accept="image/*"
                :min="min"
                :max="max"
            />
            <img v-if="form.imageUrl" :src="form.imageUrl" alt="Uploaded Image Preview" class="img-thumbnail mt-3"/>
          </div>

          <Input label="Description" v-model="form.description" type="text" :min="min" :max="max"/>
          <input type="hidden" v-model="user_id"></input>
          <Button type="submit">Next</Button>
        </form>
      </div>

      <!-- Step 5: Confirmation -->
      <div v-if="currentStep === 5">
        <h3>Confirmation</h3>
        <p><strong>Company Name:</strong> {{ form.companyName }}</p>
        <p><strong>Brand Name:</strong> {{ form.brandName }}</p>
        <p><strong>Type:</strong> {{ form.type }}</p>
        <p><strong>Product:</strong> {{ form.product }}</p>
        <p><strong>Quantity:</strong> {{ form.quantity }}</p>
        <p><strong>Price:</strong> {{ form.price }}</p>
        <p><strong>Total Calculation:</strong> {{ form.totalCalculation }}</p>
        <p><strong>Country:</strong> {{ form.country }}</p>
        <p><strong>Age:</strong> {{ form.age }}</p>
        <p><strong>Gender:</strong> {{ form.gender }}</p>
        <p><strong>Image URL:</strong> {{ form.imageUrl }}</p>
        <p><strong>Description:</strong> {{ form.description }}</p>
        <Button @click="submitForm">Submit</Button>
      </div>
    </main>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex';
import Input from '@/components/ui-components/input.vue'
import Button from '@/components/ui-components/button.vue'
import {toast} from "vue3-toastify";

export default {
  name: 'AddForm',
  components: { Input, Button },
  data() {
    return {
      //get form clear after submitting
      form: {
        companyName: null,
        brandName: null,
        type: null,
        product: null,
        quantity: null,
        price: null,
        totalCalculation: null,
        country: null,
        age: null,
        gender: null,
        imageUrl: null,
        description: null,
        user_id: 1,
      }
    }
  },

  computed: {
    ...mapGetters(['getCurrentStep', 'getForms', 'getOptions']),
    ...mapState(['userId']),
    currentStep() {
      return this.getCurrentStep;
    },
    forms() {
      return this.getForms;
    },
    options() {
      return this.getOptions;
    },
    min() {
      return 1;
    },
    max() {
      return 20;
    },
    user_id (){
      return this.userId =1
    }
  },
  //Get value of price and quantity to calculate
  watch: {
    'form.quantity': 'calculateTotal',
    'form.price': 'calculateTotal',
  },

  methods: {
    ...mapActions(['saveForm','goToNextStep','loadForms']),
    //calculate automatically Total value
    calculateTotal() {
      const quantity = parseFloat(this.form.quantity);
      const price = parseFloat(this.form.price);

      if (!isNaN(quantity) && !isNaN(price)) {
        this.form.totalCalculation = (quantity * price).toFixed(2);
      } else {
        this.form.totalCalculation = '';
      }
    },
    //uploading Image
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.imageUrl = reader.result;
        };
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
        };
      }
    },

    //Saves data and go on
    handleSubmit() {
      this.goToNextStep();
    },

    submitForm() {
      this.saveForm(this.form)
      this.$router.push('/');
      toast('Campaign Created', {
        autoclose: 1000,});
    }
  },
};
</script>


