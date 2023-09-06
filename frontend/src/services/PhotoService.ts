import api from "../utils/baseUrl";

/**
 * PhotoService class to interact with the backend API for book-related operations.
 */
class PhotoService{
    /**
     * Method to download the photo
     */
    async create() {
        return await api.post(`/download/today`,);
    }

    /**
     * Method to get all photot, with pagination
     * @param pageNo Page number to be retrieve
     * @param pageSize Number of photos fetched for page
     */
    async getAll(pageNo: number, pageSize: number) {
        return await api.get(`/photos/?page=${pageNo}&pageSize=${pageSize}`);
    }

}
const photoService = new PhotoService();
export default photoService;
