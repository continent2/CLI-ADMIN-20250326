// src/api/activities.js
import axios from 'axios';

const transformActivityData = (item) => ({
  id: item.id,
  createdat: item.createdat,
  amount: item.amount,
  currency: item.currency,
  status: item.status,
  user: {
    id: item['user.id'],
    username: item['user.username'],
    name: item['user.name'],
  },
  site: {
    id: item['site.id'],
    siteurl: item['site.siteurl'],
  },
  agency: {
    name: item['agency.name'],
  },
});

export const fetchActivities = async (offset, limit, search) => {
  const response = await axios.get(
    `https://testnet.cdeposit.online:50825/query/list/custom/deposit/_/_/id/DESC/${offset}/${limit}`,
    { params: { search } }
  );

  return {
    ...response.data,
    list: response.data.list.map(transformActivityData),
  };
};
