import fs from "fs";
import {
  ListMap,
  MemberMap,
  TrelloCard,
  TrelloList,
  TrelloMember,
} from "../../interfaces/interfaces.js";

export function jsonToCSV(jsonData: any) {
  const headers = ["Card Name", "List Name", "Description", "Labels", "Due Date", "Members"];
  const rows = [];
  rows.push(headers.join(","));

  const listMap: ListMap = {};
  jsonData.lists.forEach((list: TrelloList) => {
    listMap[list.id] = list.name;
  });

  const memberMap: MemberMap = {};
  jsonData.members.forEach((member: TrelloMember) => {
    memberMap[member.id] = member.fullName;
  });

  jsonData.cards.forEach((card: TrelloCard) => {
    if (!card.closed) {
      const listName = listMap[card.idList] || "Unknown List";
      const labelNames = card.labels.map((label) => label.name).join("; ");
      const memberNames = card.idMembers.map((id) => memberMap[id]).join("; ");
      const dueDate = card.due ? new Date(card.due).toLocaleString() : "No Due Date";

      const row = [
        `"${card.name.replace(/"/g, '""')}"`, // Escapar comillas dobles
        `"${listName.replace(/"/g, '""')}"`,
        `"${(card.desc || "").replace(/"/g, '""')}"`,
        `"${labelNames}"`,
        `"${dueDate}"`,
        `"${memberNames}"`,
      ];
      rows.push(row.join(","));
    }
  });

  return rows.join("\n");
}
