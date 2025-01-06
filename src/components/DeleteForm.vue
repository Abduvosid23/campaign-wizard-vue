<template>
  <div>
    <Modal id="deleteModal">
      <h1 class="modal-title fs-5" id="deleteModalLabel">Delete Campaign</h1>
      <div class="modal-body">
        Are you sure you want to delete this campaign?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="handleSubmit"
        >
          Yes
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { mapActions } from "vuex";
import { toast } from "vue3-toastify";

export default {
  name: 'DeleteModal',
  components: {Modal},

  props: {
    campaignId: {
      type: Number,
      required: true,
    }
  },

  methods: {
    ...mapActions(['deleteCampaign']),

    async handleSubmit() {
      try {
        await this.deleteCampaign(this.campaignId);

        toast('Campaign Deleted', {
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error deleting campaign:", error);
        toast('Error deleting campaign', {
          autoClose: 1000,
          type: 'error'
        });
      }
    }
  }
}
</script>
