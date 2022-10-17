import { DownArrow, UpArrow } from 'assets';
import { Fragment } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid #d3d3d3;
  border-collapse: separate;
  border-radius: 10px;
  border-spacing: 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow: hidden;
`;

const THead = styled.thead`
  background-color: gray;
  color: #fff;
`;

const TBody = styled.tbody``;

const TR = styled.tr`
  :nth-child(2n) {
    background-color: #f6f6f6;
  }
`;

const TH = styled.th`
  text-transform: capitalize;
  padding: 16px;
`;

const TD = styled.td`
  padding: 16px;
  text-align: center;
`;

const Image = styled.img`
  width: 14px;
  height: 14px;
  margin: 0 6px;
`;

const NoData = styled.div`
  padding: 100px 0;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TableProps {
  data: any;
  sortDirection: any;
  onClickHeader: (name: string) => void;
}

const Table: React.FC<TableProps> = ({
  // headers,
  data,
  sortDirection,
  onClickHeader,
}) => {
  const getClassNamesFor = (name: string) => {
    if (!sortDirection) {
      return;
    }
    return sortDirection.key === name ? sortDirection.direction : undefined;
  };

  const headers = ['_id', 'firstName', 'lastName', 'email'];
  return (
    <Fragment>
      <StyledTable>
        <THead>
          <TR>
            {headers.map((item, idx) => (
              <TH key={idx} onClick={() => onClickHeader(item)}>
                {item}
                {getClassNamesFor(item) && (
                  <Image
                    src={
                      getClassNamesFor(item) === 'ascending'
                        ? UpArrow
                        : DownArrow
                    }
                  />
                )}
              </TH>
            ))}
          </TR>
        </THead>

        <TBody>
          {data.map((row: any, idx: number) => (
            <TR key={idx}>
              {headers.map((col, idx) => {
                return <TD key={idx}>{row[col]}</TD>;
              })}
            </TR>
          ))}
        </TBody>
      </StyledTable>
      {data.length < 1 && <NoData>No data Found</NoData>}
    </Fragment>
  );
};

export default Table;
