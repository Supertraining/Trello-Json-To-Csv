import { ListMap, MemberMap, TrelloBoard, TrelloList, TrelloMember } from "../../interfaces.js";
import { jsonToCSV } from "./helpers/jsonToCsv.js";
export const SERVICE =  {

  formatBoardData : async (data: any) => {
   
    const jsonData = JSON.parse(data.buffer.toString('utf-8')) as TrelloBoard;
  
    const listMap: ListMap = {};
    jsonData.lists.forEach((list: TrelloList) => {
      listMap[list.id] = list.name;
    });
  
    const memberMap: MemberMap = {};
    jsonData.members.forEach((member: TrelloMember) => {
      memberMap[member.id] = member.fullName;
    });
  
    return { jsonData, listMap, memberMap };
  },

  downloadCSV : async (data: any) => {
    const { jsonData } = await SERVICE.formatBoardData(data);
    const csvData = jsonToCSV(jsonData);
    return csvData;
  }
}
