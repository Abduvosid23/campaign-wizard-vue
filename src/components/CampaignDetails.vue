<template>
  <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
    <div class="col p-4 d-flex flex-column position-static">
      <p><strong>Company Name:</strong> {{ campaign.companyName }}</p>
      <p><strong>Brand Name:</strong> {{ campaign.brandName }}</p>
      <p><strong>Type:</strong> {{ campaign.type }}</p>
      <p><strong>Product:</strong> {{ campaign.product }}</p>
      <p><strong>Quantity:</strong> {{ campaign.quantity }}</p>
      <p><strong>Price:</strong> {{ campaign.price }}</p>
      <p><strong>Total Calculation:</strong> {{ campaign.totalCalculation }}</p>
      <p><strong>Country:</strong> {{ campaign.country }}</p>
      <p><strong>Age:</strong> {{ campaign.age }}</p>
      <p><strong>Gender:</strong> {{ campaign.gender }}</p>
      <p><strong>Description:</strong> {{ campaign.description }}</p>
      <div class="d-flex">
      <div class="justify-content-center p-2">
        <button class="btn btn-primary" @click="openEditModal()" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
      </div>
      <div class="justify-content-center p-2">
        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
      </div>
        <update-form />
        <delete-form :campaign-id="campaign.id" />
    </div>
    </div>
    <div class="col-auto d-none d-lg-block">
      <img :src="campaign.imageUrl" :alt="`${campaign.product} Image`" class="bd-placeholder-img" width="200" height="250" />
    </div>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import DeleteForm from "@/components/DeleteForm.vue";
import UpdateForm from "@/components/UpdateForm.vue";
import { mapMutations, mapState} from "vuex";

export default {
  name:'CampaignDetails',
  components: {Modal,UpdateForm, DeleteForm},
  props:{
    campaign: {
      type: Object,
      required: true,
    }
  },
  methods: {
    ...mapMutations(['updatedCampaignMutation']),
    ...mapState(['isModalVisible']),
    openEditModal() {
      this.updatedCampaignMutation(this.campaign);
    },
  }
}
</script>