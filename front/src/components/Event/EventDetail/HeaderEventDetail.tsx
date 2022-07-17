import React, { ReactElement } from 'react'

interface Props {
  tab: number;
  setTab: (value: number) => void;
}
const HeaderEventDetail: React.FC<Props> = ({ tab, setTab }: Props): ReactElement => {
  return (
    <div className='header-event-detail flex justify-center mb-6 '>
      <div
        className={`header-event-detail__tab cursor-pointer font-semibold ${tab === 1 && 'active'}`}
        onClick={() => setTab(1)}
      >
        Detail
      </div>
      <div
        className={`header-event-detail__tab cursor-pointer font-semibold ${tab === 2 && 'active'}`}
        onClick={() => setTab(2)}
      >
        Tickets
      </div>
      {/* <div
        className={`header-event-detail__tab cursor-pointer font-semibold ${tab === 3 && 'active'}`}
        onClick={() => setTab(3)}
      >
        Owner
      </div> */}
    </div>
  )
}

export default HeaderEventDetail