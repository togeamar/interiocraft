import { PROJECT_BASE_URL } from "../../constants/ApiConstants";
import client from "./client";

export async function getAllProjects(){
    return client.get(`${PROJECT_BASE_URL}/projects`);
}