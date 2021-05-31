import Router from 'next/router'
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { impressionDelete } from '../../common/backend/impression'
import SimpleModal from '../organisms/Modal'

const ITEM_HEIGHT = 48;

type props = {
  id: string,
}

export default function EditMenu(props: props) {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [modalopen, setModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const changeHandle = () => {
    console.log('update');
    setAnchorEl(null);
  };

  const deleteHandle = () => {
    setAnchorEl(null);
    setModalOpen(true)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={changeHandle}>編集</MenuItem>
        <MenuItem onClick={deleteHandle}>削除</MenuItem>
      </Menu>
      <SimpleModal
        title="感想文を削除しますか？"
        massage="一度削除すると復旧することはできません。"
        open={modalopen}
        falseClick={() => { setModalOpen(false) }}
        trueClick={async () => {
          await Router.push('/home')
          await impressionDelete(props.id)
        }}
      />
    </div>
  );
}