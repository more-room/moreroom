/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "../../../../components/TopBar";
import { IParty, IChatRoomInfo, IMemberListResponse } from "../../../../types/chatingTypes";
import { getPartyList, getMyPartyList, getChatRoomInfo, patchChatRoomInfo, getPartyMembers } from "../../../../apis/chatApi";
import { ThemeItem } from "../../../../components/ThemeItem";
import { titletext, topbarcolor, textcolor, infobox, buttoncss, hr, exitbutton, wait, memberContainer, memberItem, memberImage, memberName } from "./styles";
import { InfoBox } from "../../../../components/InfoBox";
import { UserIcon } from "@heroicons/react/24/solid";
import { Button } from "../../../../components/Button";
import { Colors } from "../../../../styles/globalStyle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RoomNameModal } from "../../../../components/CustomModal/RoomNameModal";
import { DateModal } from "../../../../components/CustomModal/DateModal";
import { MaxMemberModal } from "../../../../components/CustomModal/MaxMemberModal";

export const RoomdetailFetch = () => {
  const { partyId } = useParams<{ partyId: string }>();
  const nav = useNavigate();
  const [chatRoomInfo, setChatRoomInfo] = useState<IChatRoomInfo | null>(null);
  const [members, setMembers] = useState<IMemberListResponse | null>(null);

  // 각 모달의 열림 상태를 관리하는 상태 값
  const [roomNameModalOpen, setRoomNameModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [maxMemberModalOpen, setMaxMemberModalOpen] = useState(false);

  // Suspense Query로 데이터 가져오기
  const partyQuery = useSuspenseQuery({
    queryKey: ["Roomdetail"],
    queryFn: async () => await getPartyList(),
  });

  const mypartyQuery = useSuspenseQuery({
    queryKey: ["MyRoomdetail"],
    queryFn: async () => await getMyPartyList(),
  });

  const chatRoomQuery = useSuspenseQuery({
    queryKey: ["ChatRoomInfo", partyId],
    queryFn: async () => {
      if (partyId) {
        return await getChatRoomInfo(Number(partyId));
      }
      throw new Error("Party ID is missing");
    },
  });

  // 파티원 정보를 가져오기 위한 useEffect
  useEffect(() => {
    if (partyId) {
      getPartyMembers(Number(partyId))
        .then((response) => setMembers(response.data))
        .catch((error) => console.error("파티원 정보를 가져오는 중 오류 발생:", error));
    }
  }, [partyId]);

  useEffect(() => {
    if (chatRoomQuery.data) {
      setChatRoomInfo(chatRoomQuery.data.data);
    }
  }, [chatRoomQuery.data]);

  if (partyQuery.isLoading || mypartyQuery.isLoading || chatRoomQuery.isLoading || !chatRoomInfo) {
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
  const selectedParty = mypartyList.find((party) => party.partyId === Number(partyId)) || 
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
      alert("채팅방 정보가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("채팅방 정보 수정 중 오류 발생:", error);
    }
  };

  // 각 모달에서 확인 버튼 클릭 시 호출되는 핸들러
  const handleConfirmRoomNameChange = (newRoomName: string) => {
    if (newRoomName && newRoomName.length >= 1 && newRoomName.length <= 40 && !newRoomName.trim().includes(" ")) {
      updateChatRoomInfo({ roomName: newRoomName });
    } else {
      alert("채팅방 제목은 1자 이상 40자 이하, 공백 없이 입력해야 합니다.");
    }
    setRoomNameModalOpen(false);
  };

  const handleConfirmDateChange = (newDate: string) => {
    try {
      if (newDate) {
        updateChatRoomInfo({ date: newDate }); // 형식이 'YYYY-MM-DD HH:MM'으로 전달됨
      }
      setDateModalOpen(false);
    } catch (error) {
      console.error("잘못된 날짜 포맷입니다.");
      alert("날짜 형식이 잘못되었습니다. 다시 시도해 주세요.");
    }
  };

  const handleConfirmMaxMemberChange = (newMaxMember: number) => {
    if (newMaxMember > 0) {
      updateChatRoomInfo({ maxMember: newMaxMember });
    } else {
      alert("최대 인원 수는 1명 이상이어야 합니다.");
    }
    setMaxMemberModalOpen(false);
  };

  const handleToggleVisibility = () => {
    const newAddFlag = !chatRoomInfo.addFlag;
    updateChatRoomInfo({ addFlag: newAddFlag });
  };

  const exitbuttonhandle = () => {
    console.log("채팅방 나가기 버튼");
  };
  console.log(members)

  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" defaultValue="파티 목록" title="채팅방 설정" backHandler={() => nav(-1)} />
      </TopBar>

      {/* 채팅방 제목 클릭 시 수정 가능 */}
      <div css={titletext} onClick={() => setRoomNameModalOpen(true)}>
        {chatRoomInfo.roomName}
      </div>

      {/* 채팅방 이름 변경 모달 */}
      {roomNameModalOpen && (
        <RoomNameModal
          title="새로운 채팅방 제목을 입력하세요"
          initialValue={chatRoomInfo.roomName}
          onConfirm={handleConfirmRoomNameChange}
          onCancel={() => setRoomNameModalOpen(false)}
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
          style={{ margin: "0.5rem" }}
          onClick={() => setDateModalOpen(true)}
        >
          {chatRoomInfo.date}
        </InfoBox>

        {/* 날짜 변경 모달 */}
        {dateModalOpen && (
          <DateModal
            title="새로운 날짜를 입력하세요"
            initialValue={chatRoomInfo.date}
            onConfirm={handleConfirmDateChange}
            onCancel={() => setDateModalOpen(false)}
          />
        )}

        {/* 최대 인원 변경 가능 */}
        <InfoBox
          fontSize={0.8}
          fontWeight={500}
          icon={<UserIcon />}
          color={"secondary"}
          size={1.3}
          style={{ margin: "0.5rem" }}
          onClick={() => setMaxMemberModalOpen(true)}
        >
          최대 {chatRoomInfo.maxMember}명
        </InfoBox>

        {/* 최대 인원 변경 모달 */}
        {maxMemberModalOpen && (
          <MaxMemberModal
            title="새로운 최대 인원 수를 입력하세요"
            initialValue={chatRoomInfo.maxMember}
            min={1}
            max={100}
            onConfirm={handleConfirmMaxMemberChange}
            onCancel={() => setMaxMemberModalOpen(false)}
          />
        )}
      </div>

      {/* 공개 상태 변경 버튼 */}
      <div css={buttoncss}>
        <Button
          variant="contained"
          fullwidth={true}
          rounded={0.4}
          handler={handleToggleVisibility}
          style={{
            border: "0",
            fontSize: "1rem",
            backgroundColor: chatRoomInfo.addFlag ? `${Colors["primary"]["A200"]}` : `${Colors["secondary"]["200"]}`,
          }}
        >
          {chatRoomInfo.addFlag ? "채팅방 공개" : "채팅방 비공개"}
        </Button>
        <hr css={hr}></hr>
      </div>

      {/* 파티원 정보 표시 */}
      <div css={textcolor}>파티원</div>
      <div css={memberContainer}>
        {members?.memberList.map((member, index) => (
          <div key={index} css={memberItem}>
            <img src={`/profiles/profile${member.photo}.png`} alt={`profiles/profile${member.photo}.png`} css={memberImage} />
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
