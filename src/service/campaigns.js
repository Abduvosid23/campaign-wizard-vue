import axios from './axios';

const CampaignService = {
    getCampaigns() {
        return axios.get('/campaigns');
    },
    getCampaignDetail(id) {
        return axios.get(`/campaigns/${id}`);
    },
    createCampaign(campaign) {
        return axios.post('/campaign/store', { campaign });
    },
    deleteCampaign(id) {
        return axios.delete(`/campaign/${id}`);
    },
    updateCampaign(id, campaign) {
        return axios.put(`/campaign/update/${id}`, { campaign });
    },
}

export default CampaignService;
