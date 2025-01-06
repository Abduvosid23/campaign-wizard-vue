<template>
  <div class="container">
      <loader v-if="isLoading"/>
    <div v-else class="col-md-6" v-for="form in getForms" :key="form.id">
      <campaign-details :campaign="form"/>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapState} from "vuex";
import CampaignDetails from "@/components/CampaignDetails.vue";
import Modal from "@/components/Modal.vue";
import Loader from "@/components/ui-components/Loader.vue";

export default {
  name: 'CampaignList',
  components: {Loader, Modal, CampaignDetails},

  computed: {
    ...mapGetters(['getForms','isLoading']),
  },
  created(){
    this.loadForms()
  },
  methods: {
    ...mapActions(['loadForms'])
  }
};
</script>