/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '../../../../components/TopBar';
import {
  IParty,
  IChatRoomInfo,
  IMemberListResponse,
} from '../../../../types/chatingTypes';
import {
  getPartyList,
  getMyPartyList,
  getChatRoomInfo,
  patchChatRoomInfo,
  getPartyMembers,
} from '../../../../apis/chatApi';
import { ThemeItem } from '../../../../components/ThemeItem';
import {
  titletext,
  topbarcolor,
  textcolor,
  infobox,
  buttoncss,
  hr,
  exitbutton,
  memberContainer,
  memberItem,
  memberImage,
  memberName,
  inputStyle,
  rangeInputStyle,
  btnContainerCss,
  container,
} from './styles';
import { InfoBox } from '../../../../components/InfoBox';
import { Typography } from '../../../../components/Typography';
import { UserIcon } from '@heroicons/react/24/solid';
import { Button } from '../../../../components/Button';
import { Colors } from '../../../../styles/globalStyle';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Modal } from '../../../../components/Modal'; 
import { Notification } from '../../../../components/Notification';
import { input } from '../../Modal/RoomName/styles';
import { inputbox } from '../styles';

export const RoomdetailFetch = () => {
  const { partyId } = useParams<{ partyId: string }>();
  const nav = useNavigate();
  const [chatRoomInfo, setChatRoomInfo] = useState<IChatRoomInfo | null>(null);
  const [members, setMembers] = useState<IMemberListResponse | null>(null);

  // 각 모달의 열림 상태를 관리하는 상태 값
  const [roomNameModalOpen, setRoomNameModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [maxMemberModalOpen, setMaxMemberModalOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newMaxMember, setNewMaxMember] = useState<number>(0);

  // Suspense Query로 데이터 가져오기
  const partyQuery = useSuspenseQuery({
    queryKey: ['Roomdetail'],
    queryFn: async () => await getPartyList(),
  });

  const mypartyQuery = useSuspenseQuery({
    queryKey: ['MyRoomdetail'],
    queryFn: async () => await getMyPartyList(),
  });

  const chatRoomQuery = useSuspenseQuery({
    queryKey: ['ChatRoomInfo', partyId],
    queryFn: async () => {
      if (partyId) {
        return await getChatRoomInfo(Number(partyId));
      }
      throw new Error('Party ID is missing');
    },
  });

  // 파티원 정보를 가져오기 위한 useEffect
  useEffect(() => {
    if (partyId) {
      getPartyMembers(Number(partyId))
        .then((response) => setMembers(response.data))
        .catch((error) =>
          console.error('파티원 정보를 가져오는 중 오류 발생:', error),
        );
    }
  }, [partyId]);

  useEffect(() => {
    if (chatRoomQuery.data) {
      setChatRoomInfo(chatRoomQuery.data.data);
    }
  }, [chatRoomQuery.data]);

  if (
    partyQuery.isLoading ||
    mypartyQuery.isLoading ||
    chatRoomQuery.isLoading ||
    !chatRoomInfo
  ) {
    return <div>로딩 중...</div>;
  }

  if (partyQuery.error && !partyQuery.isFetching) {
    throw partyQuery.error;
  }

  if (mypartyQuery.error && !mypartyQuery.isFetching) {
    throw mypartyQuery.error;
  }

  if (chatRoomQuery.error && !chatRoomQuery.isFetching) {
    throw chatRoomQuery.error;
  }

  // 파티 목록 가져오기
  const partyList: IParty[] = partyQuery.data.data.partyList || [];
  const mypartyList: IParty[] = mypartyQuery.data.data.partyList || [];

  // 선택한 파티 찾기
  const selectedParty =
    mypartyList.find((party) => party.partyId === Number(partyId)) ||
    partyList.find((party) => party.partyId === Number(partyId));

  if (!selectedParty || !selectedParty.theme) {
    return <div>해당 파티의 상세정보가 없습니다.</div>;
  }

  // 채팅방 정보를 업데이트하여 서버에 전송하는 함수
  const updateChatRoomInfo = async (updatedFields: Partial<IChatRoomInfo>) => {
    try {
      const updatedInfo = {
        ...chatRoomInfo,
        ...updatedFields,
      };
      await patchChatRoomInfo(Number(partyId), updatedInfo);
      setChatRoomInfo(updatedInfo); // 상태 업데이트
      setNotificationOpen(true); // Notification 열기
    } catch (error) {
      console.error('채팅방 정보 수정 중 오류 발생:', error);
    }
  };

  // 각 모달에서 확인 버튼 클릭 시 호출되는 핸들러
  const handleConfirmRoomNameChange = () => {
    if (
      newRoomName &&
      newRoomName.length >= 1 &&
      newRoomName.length <= 40 &&
      !newRoomName.trim().includes(' ')
    ) {
      updateChatRoomInfo({ roomName: newRoomName });
    } else {
      alert('채팅방 제목은 1자 이상 40자 이하, 공백 없이 입력해야 합니다.');
    }
    setRoomNameModalOpen(false);
  };

  const handleConfirmDateChange = () => {
    if (newDate) {
      updateChatRoomInfo({ date: newDate });
    } else {
      alert('유효한 날짜를 입력하세요.');
    }
    setDateModalOpen(false);
  };

  const handleConfirmMaxMemberChange = () => {
    if (newMaxMember > 0) {
      updateChatRoomInfo({ maxMember: newMaxMember });
    } else {
      alert('최대 인원 수는 1명 이상이어야 합니다.');
    }
    setMaxMemberModalOpen(false);
  };

  const handleRoomNameModalOpen = () => {
    setNewRoomName(chatRoomInfo.roomName);
    setRoomNameModalOpen(true);
  };

  const handleDateModalOpen = () => {
    setNewDate(chatRoomInfo.date);
    setDateModalOpen(true);
  };

  const handleMaxMemberModalOpen = () => {
    setNewMaxMember(chatRoomInfo.maxMember);
    setMaxMemberModalOpen(true);
  };

  const handleToggleVisibility = () => {
    const newAddFlag = !chatRoomInfo.addFlag;
    updateChatRoomInfo({ addFlag: newAddFlag });
  };

  const exitbuttonhandle = () => {
    console.log('채팅방 나가기 버튼');
  };

  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title
          type="default"
          defaultValue="파티 목록"
          title="채팅방 설정"
          backHandler={() => nav(-1)}
        />
      </TopBar>

      {/* 채팅방 제목 클릭 시 수정 가능 */}
      <div css={titletext} onClick={handleRoomNameModalOpen}>
        {chatRoomInfo.roomName}
      </div>

      {/* 채팅방 이름 변경 모달 */}
      {roomNameModalOpen && (
        <Modal height={35}>
          <div css={container}>
            <Typography color="light" size={1} weight={400}>
              새로운 채팅방의 이름을 입력해주세요
            </Typography>
            <div css={inputbox}>
              <input
                value={newRoomName}
                css={input}
                type="text"
                onChange={(e) => {
                  setNewRoomName(e.target.value);
                }}
              />
            </div>
            <div css={btnContainerCss}>
              <Button
                variant="contained"
                rounded={0.5}
                handler={handleConfirmRoomNameChange}
              >
                확인
              </Button>
              <Button
                variant="outlined"
                rounded={0.5}
                handler={() => setRoomNameModalOpen(false)}
              >
                취소
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* 날짜 변경 모달 */}
      {dateModalOpen && (
        <Modal height={35}>
          <div css={container}>
            <Typography color="light" size={1} weight={400}>
              새로운 날짜를 입력해주세요.
            </Typography>
            <input
              type="text"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              css={inputStyle}
            />
            <div css={btnContainerCss}>
              <Button
                variant="contained"
                rounded={0.5}
                handler={handleConfirmDateChange}
              >
                확인
              </Button>
              <Button
                variant="outlined"
                rounded={0.5}
                handler={() => setDateModalOpen(false)}
              >
                취소
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* 최대 멤버 변경 모달 */}
      {maxMemberModalOpen && (
        <div>
          <Modal height={35}>
            <div css={container}>
              <Typography color="light" size={1} weight={400}>
                새로운 최대 인원 수를 입력하세요
              </Typography>
              <input
                type="range"
                min="1"
                max="10"
                value={newMaxMember}
                onChange={(e) => setNewMaxMember(parseInt(e.target.value))}
                css={rangeInputStyle}
              />
              <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
                <Typography color="grey">
                  현재 인원 수: {newMaxMember}
                </Typography>
              </div>
              <div css={btnContainerCss}>
                <Button
                  variant="contained"
                  rounded={0.5}
                  handler={handleConfirmMaxMemberChange}
                >
                  확인
                </Button>
                <Button
                  variant="outlined"
                  rounded={0.5}
                  handler={() => setMaxMemberModalOpen(false)}
                >
                  취소
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {/* Notification 모달 */}
      {notificationOpen && (
        <Notification
          ment="채팅방 정보가 성공적으로 변경되었습니다."
          type="confirm"
          handler={() => setNotificationOpen(false)}
        />
      )}

      <div css={textcolor}>테마 정보</div>
      <ThemeItem theme={selectedParty.theme} />

      <div css={textcolor}>파티 정보</div>
      <div css={infobox}>
        {/* 날짜 변경 가능 */}
        <InfoBox
          fontSize={0.8}
          fontWeight={500}
          size={1.3}
          style={{ margin: '0.5rem' }}
          onClick={handleDateModalOpen}
        >
          {chatRoomInfo.date}
        </InfoBox>

        {/* 최대 인원 변경 가능 */}
        <InfoBox
          fontSize={0.8}
          fontWeight={500}
          icon={<UserIcon />}
          color={'secondary'}
          size={1.3}
          style={{ margin: '0.5rem' }}
          onClick={handleMaxMemberModalOpen}
        >
          최대 {chatRoomInfo.maxMember}명
        </InfoBox>
      </div>

      {/* 공개 상태 변경 버튼 */}
      <div css={buttoncss}>
        <Button
          variant="contained"
          fullwidth={true}
          rounded={0.4}
          handler={handleToggleVisibility}
          style={{
            border: '0',
            fontSize: '1rem',
            backgroundColor: chatRoomInfo.addFlag
              ? `${Colors['primary']['A200']}`
              : `${Colors['secondary']['200']}`,
          }}
        >
          {chatRoomInfo.addFlag ? "공개" : "비공개"}
        </Button>
        <hr css={hr}></hr>
      </div>

      {/* 파티원 정보 표시 */}
      <div css={textcolor}>파티원</div>
      <div css={memberContainer}>
        {members?.memberList.map((member, index) => (
          <div key={index} css={memberItem}>
            <img
              src={`/profiles/profile${member.photo}.png`}
              alt={`profiles/profile${member.photo}.png`}
              css={memberImage}
            />
            <div css={memberName}>{member.nickname}</div>
          </div>
        ))}
      </div>

      {/* 나가기 버튼 */}
      <div css={buttoncss}>
        <Button
          css={exitbutton}
          variant="contained"
          fullwidth={true}
          rounded={0.4}
          handler={exitbuttonhandle}
        >
          채팅방 나가기
        </Button>
      </div>
    </div>
  );
};
