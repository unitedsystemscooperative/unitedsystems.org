import { ICMDR } from 'models/admin/cmdr';
import { useEffect, useState } from 'react';

export const useCmdrSearch = <T extends ICMDR>({
  searchValue,
  cmdrs,
}: {
  searchValue: string;
  cmdrs: T[];
}) => {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [origData, setOrigData] = useState<T[]>([]);
  const [searchIndex, setSearchIndex] = useState<{ allValues: string }[]>([]);

  useEffect(() => {
    const crawl = (cmdr, allValues?: string[]) => {
      if (!allValues) allValues = [];

      for (const key in cmdr) {
        if (typeof cmdr[key] === 'object') crawl(cmdr[key], allValues);
        else allValues.push(cmdr[key] + '');
      }
      return allValues;
    };

    const handleData = () => {
      setOrigData(cmdrs);
      setFilteredData(cmdrs);
      const searchInd: { allValues: string }[] = cmdrs.map((cmdr) => {
        const allValues = crawl(cmdr);
        return { allValues: allValues.toString() };
      });
      setSearchIndex(searchInd);
    };

    handleData();
  }, [cmdrs]);

  useEffect(() => {
    if (searchValue) {
      const reqData = searchIndex.map((cmdr, index) => {
        if (
          cmdr.allValues.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        )
          return origData[index];
        return null;
      });

      setFilteredData(reqData.filter((cmdr) => (cmdr ? true : false)));
    } else {
      setFilteredData(origData);
    }
  }, [searchValue, origData, searchIndex]);

  return { filteredData };
};
