export const updateItem = <Item extends {id: number}>(items: Array<Item>, update: Item): Array<Item> => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const deleteItem = <Item extends {id: number}>(items: Array<Item>, update: Item): Array<Item> => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    ...items.slice(index + 1)
  ];
};
