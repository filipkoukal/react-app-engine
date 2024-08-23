import { List, ListItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useMemo, useState } from 'react';

const FilteredList = ({ list }: { list: string[] }) => {
  return (
    <List>
      {list.map((item, index) => (
        <ListItem key={index}>{item}</ListItem>
      ))}
    </List>
  );
};

const NoMemoDemo = () => {
  const noMemoItems = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];
  const [noMemoFilteredItems, setNoMemoFilteredItems] = useState(noMemoItems);
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filtered = noMemoItems.filter((item) =>
      item.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setNoMemoFilteredItems(filtered);
  };

  return (
    <Stack>
      <Typography>Without memo</Typography>
      <TextField type="text" onChange={handleFilterChange} placeholder="Filter items" />
      <FilteredList list={noMemoFilteredItems}></FilteredList>
    </Stack>
  );
};

const myfunc = () => {
  for (let i = 0; i < 10000; i++) {
    console.log('');
  }
  console.log('ahoj');
  return 2;
};

const MemoDemo = () => {
  const [filter, setFilter] = useState('');
  const items = useMemo(() => ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'], []);

  const mynum = myfunc();
  const filteredItems = useMemo(() => {
    myfunc();
    return items.filter((item) => item.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, items]);

  return (
    <Stack>
      <Typography>{mynum}</Typography>
      <Typography>With memo</Typography>
      <TextField
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items"
      />
      <FilteredList list={filteredItems}></FilteredList>
    </Stack>
  );
};

export const UseMemoDemo = () => {
  return (
    <Stack>
      <Typography variant="h6">Use memo</Typography>
      <Paper sx={{ p: 2, backgroundColor: 'grey.100' }} elevation={2}>
        <Stack flexDirection={'row'} gap={2}>
          <Stack gap={2}>
            <MemoDemo />
          </Stack>
          <Stack gap={2}>
            <NoMemoDemo />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
