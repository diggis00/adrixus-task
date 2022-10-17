import { useState, useMemo } from 'react';
import { users } from 'data/users';

const headers = Object.keys(users[0]);

type headersKeys = typeof headers[number];
type directions = 'ascending' | 'descending';
interface ISortConfig {
  key: headersKeys;
  direction: directions;
}
export const useSort = (items: any, config = null) => {
  const [sortConfig, setSortConfig] = useState<ISortConfig | null>(config);

  const sortedItems = useMemo(() => {
    let sortableItems = items.length > 0 ? [...items] : [];

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: headersKeys) => {
    let direction: directions = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};
