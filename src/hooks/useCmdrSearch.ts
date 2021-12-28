import { genericSearchArray } from '@/functions/search';
import { ICMDR } from '~/admin/models/cmdr';
import { useEffect, useState } from 'react';

export const useCmdrSearch = <T extends ICMDR>({
  searchValue,
  cmdrs,
}: {
  searchValue: string;
  cmdrs: T[];
}): T[] => {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [origData, setOrigData] = useState<T[]>([]);

  useEffect(() => {
    setOrigData(cmdrs);
  }, [cmdrs]);

  useEffect(() => {
    const filtered = genericSearchArray(origData, searchValue);
    setFilteredData(filtered);
  }, [origData, searchValue]);

  return filteredData;
};
