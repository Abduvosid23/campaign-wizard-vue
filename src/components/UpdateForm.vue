<template>
  <div>
    <Modal id="editModal">
      <h1 class="modal-title fs-5" id="editModalLabel">Update Campaign</h1>
      <Input label="Company Name" v-model="form.companyName" type="text" :min="min" :max="max"/>
      <Input label="Brand Name" v-model="form.brandName" type="text" :min="min" :max="max" />
      <div class="mb-3">
        <label for="country" class="form-label">Country:</label>
        <select id="country" v-model="form.country" class="form-select">
          <option disabled value="">Select a country</option>
          <option v-for="country in options.countries" :key="country">{{ country }}</option>
        </select>
      </div>
      <Input label="Age" v-model="form.age" type="number" :min="min" :max="max" />
      <div class="mb-3">
        <label for="gender" class="form-label">Gender:</label>
        <select id="gender" v-model="form.gender" class="form-select">
          <option disabled value="">Select a gender</option>
          <option v-for="gender in options.genders" :key="gender">{{ gender }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="type" class="form-label">Type:</label>
        <select id="type" v-model="form.type" class="form-select">
          <option disabled value="">Select a type</option>
          <option v-for="type in options.types" :key="type">{{ type }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="product" class="form-label">Products:</label>
        <select id="product" v-model="form.product" class="form-select">
          <option disabled value="">Select a product</option>
          <option v-for="product in options.products" :key="product">{{ product }}</option>
        </select>
      </div>
      <Input label="Quantity" v-model="form.quantity" type="number" :min="min" :max="max" />
      <Input label="Price" v-model="form.price" type="number" :min="min" :max="max" />
      <Input label="Total Calculation" v-model="form.totalCalculation" type="text" readonly />
      <Input label="Description" v-model="form.description" type="text" />
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="submitUpdate" data-bs-dismiss="modal">Save Changes</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Modal from "@/components/Modal.vue";
import Input from "@/components/ui-components/input.vue";
import { toast } from "vue3-toastify";

export default {
  name: 'UpdateForm',
  components: { Modal, Input },

  computed: {
    ...mapGetters(['getOptions', 'updateCampaignDetail']),
    form() {
      return { ...this.updateCampaignDetail };
    },
    options() {
      return this.getOptions;
    },
    min() {
      return 1;
    },
    max() {
      return 20;
    }
  },

  watch: {
    'form.quantity': 'calculateTotal',
    'form.price': 'calculateTotal',
  },

  methods: {
    ...mapActions(['updateCampaignAction']),

    calculateTotal() {
      const quantity = parseFloat(this.form.quantity);
      const price = parseFloat(this.form.price);

      if (!isNaN(quantity) && !isNaN(price)) {
        this.form.totalCalculation = (quantity * price).toFixed(2);
      } else {
        this.form.totalCalculation = '';
      }
    },

    async submitUpdate() {
      try {
        await this.updateCampaignAction(this.form);

        toast('Campaign updated', {
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error updating campaign:", error);
        toast('Error updating campaign', {
          autoClose: 1000,
          type: 'error'
        });
      }
    },
  },
}
</script>
