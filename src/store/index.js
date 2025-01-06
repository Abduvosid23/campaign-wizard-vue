import { createStore } from 'vuex';
import CampaignService from '@/service/campaigns.js';

export default createStore({
    state: {
        forms: [],
        currentStep: 1,
        totalSteps: 5,
        isModalVisible: false,
        updateCampaignDetail: [],
        deleteCampaign: '',
        isLoading: false,
        userId: 1,
        options: {
            countries: [
                "United States", "Canada", "United Kingdom", "Australia", "Germany",
                "France", "Italy", "Spain", "India", "China", "Japan", "Brazil", "Mexico",
                "South Africa", "Russia"
            ],
            types: ["Accessories", "Mobile Phones", "Headphones", "Laptops"],
            products: ["Mi Buds 3", "Redmi Note 12", "MacBook Air", "MacBook Pro", "Charger"],
            genders: ["Male", "Female"],
        },
    },
    mutations: {
        setForms(state, forms) {
            state.forms = forms;
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
        addForm(state, formData) {
            formData.id = Date.now();
            state.forms.push(formData);
            localStorage.setItem('forms', JSON.stringify(state.forms));
        },
        updateCampaign(state, campaign) {
            const index = state.forms.findIndex(c => c.id === campaign.id);
            if (index !== -1) {
                state.forms.splice(index, 1, campaign);
                localStorage.setItem('forms', JSON.stringify(state.forms));
            }
        },
        deleteCampaign(state, formId) {
            const index = state.forms.findIndex(f => f.id === formId);
            if (index !== -1) {
                state.forms.splice(index, 1);
                localStorage.setItem('forms', JSON.stringify(state.forms));
            }
        },
        updatedCampaignMutation(state, campaign) {
            state.updateCampaignDetail = campaign;
        },
        nextStep(state) {
            if (state.currentStep < state.totalSteps) {
                state.currentStep++;
            }
        },
        resetCurrentForm(state) {
            state.currentStep = 1;
        },
        setModalVisibility(state, visibility) {
            state.isModalVisible = visibility;
        }
    },
    actions: {
        async loadForms({ commit }) {
            commit('setLoading', true);
            try {
                const response = await CampaignService.getCampaigns();
                commit('setForms', response.data);
            } catch (error) {
                console.error("Error loading forms:", error);
            } finally {
                commit('setLoading', false);
            }
        },
        async saveForm({ commit }, formData) {
            commit('setLoading', true);
            try {
                await CampaignService.createCampaign(formData);
                commit('addForm', formData);
                commit('resetCurrentForm');
            } catch (error) {
                console.error("Error saving form:", error);
            } finally {
                commit('setLoading', false);
            }
        },
        async updateCampaignAction({ commit }, campaign) {
            commit('setLoading', true);
            try {
                await CampaignService.updateCampaign(campaign.id, campaign);
                commit('updateCampaign', campaign);
            } catch (error) {
                console.error("Error updating campaign:", error);
            } finally {
                commit('setLoading', false);
            }
        },
        async deleteCampaign({ commit }, campaignId) {
            commit('setLoading', true);
            try {
                await CampaignService.deleteCampaign(campaignId);
                commit('deleteCampaign', campaignId);
            } catch (error) {
                console.error("Error deleting campaign:", error);
            } finally {
                commit('setLoading', false);
            }
        },
        goToNextStep({ commit }) {
            commit('nextStep');
        },
    },
    getters: {
        getCurrentStep: (state) => state.currentStep,
        getForms: (state) => state.forms,
        getOptions: (state) => state.options,
        isModalVisible: (state) => state.isModalVisible,
        updateCampaignDetail: (state) => state.updateCampaignDetail,
        isLoading: (state) => state.isLoading,
    },
});
