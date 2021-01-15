import { storage } from "../core/utils";

function toHTML(key) {
  const tableData = getTableDataByKey(key);

  return `<li class="db__record">
            <a href="${tableData.link}">${tableData.name}</a>
            <strong>${tableData.time}</strong>
         </li>`;
}

function getTableDataByKey(key) {
  const data = storage(key);

  const id = key.replace("excel: ", "");
  const link = `#excel/${id}`;
  const date = new Date(data.openDate);
  const createTime = `${date.toLocaleTimeString()} ${date.toLocaleDateString(
    "ru-UE"
  )} `;
  return { name: data.currentTableName, time: createTime, link };
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes("excel")) {
      continue;
    }
    keys.push(key);
  }

  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return "<p>Вы пока не создали ни одной таблицы</p>";
  }

  return `<div class="db__list-header">
            <span>Название табицы</span>
            <span>Дата открытия</span>
          </div>

          <ul class="db__list">
            ${keys.map(toHTML).join("")}
          </ul>`;
}
