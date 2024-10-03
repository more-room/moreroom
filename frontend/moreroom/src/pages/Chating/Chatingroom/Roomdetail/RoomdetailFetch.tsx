/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "../../../../components/TopBar";
import { IParty, IChatRoomInfo } from "../../../../types/chatingTypes"; // IChatRoomInfo 타입 임포트
import { getPartyList, getMyPartyList, getChatRoomInfo, patchChatRoomInfo } from "../../../../apis/chatApi";
import { ThemeItem } from "../../../../components/ThemeItem";
import { titletext, topbarcolor, textcolor, infobox, buttoncss, hr, exitbutton, wait } from "./styles";
import { InfoBox } from "../../../../components/InfoBox";
import { UserIcon } from "@heroicons/react/24/solid";
import { Button } from "../../../../components/Button";
import { Colors } from "../../../../styles/globalStyle";
import { useSuspenseQuery } from "@tanstack/react-query";

export const RoomdetailFetch = () => {
  const { partyId } = useParams<{ partyId: string }>(); // URL에서 partyId 가져오기
  const nav = useNavigate();
  const [chatRoomInfo, setChatRoomInfo] = useState<IChatRoomInfo | null>(null);

  // 파티 데이터를 가져오기 위해 useSuspenseQuery 사용
  const partyQuery = useSuspenseQuery({
    queryKey: ["Roomdetail"],
    queryFn: async () => await getPartyList(),
  });

  // 내가 속한 파티 데이터
  const mypartyQuery = useSuspenseQuery({
    queryKey: ["MyRoomdetail"],
    queryFn: async () => await getMyPartyList(),
  });

  // 채팅방 세부 정보 가져오기 위한 Suspense Query
  const chatRoomQuery = useSuspenseQuery({
    queryKey: ["ChatRoomInfo", partyId],
    queryFn: async () => {
      if (partyId) {
        return await getChatRoomInfo(Number(partyId));
      }
      throw new Error("Party ID is missing");
    },
  });

  // 채팅방 정보를 가져온 후 상태에 저장
  useEffect(() => {
    if (chatRoomQuery.data) {
      setChatRoomInfo(chatRoomQuery.data.data);
    }
  }, [chatRoomQuery.data]);

  // 로딩 상태 처리
  if (partyQuery.isLoading || mypartyQuery.isLoading || chatRoomQuery.isLoading || !chatRoomInfo) {
    return <div>로딩 중...</div>;
  }

  // 에러 처리
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
  const partyList: IParty[] = partyQuery.data.data.partyList || []; // 전체 파티 목록
  const mypartyList: IParty[] = mypartyQuery.data.data.partyList || []; // 내가 속한 파티 목록

  // 선택한 파티 찾기 - 우선 마이 파티 목록에서 찾고 없으면 전체 파티 목록에서 찾음
  const selectedParty = mypartyList.find((party) => party.partyId === Number(partyId)) || 
                        partyList.find((party) => party.partyId === Number(partyId));

  // 해당 파티가 없는 경우 예외 처리
  if (!selectedParty || !selectedParty.theme) {
    return <div>해당 파티의 상세정보가 없습니다.</div>;
  }

  // 모든 필드를 업데이트하여 서버에 전송하는 함수
  const updateChatRoomInfo = async (updatedFields: Partial<IChatRoomInfo>) => {
    try {
      const updatedInfo = {
        ...chatRoomInfo,
        ...updatedFields,
      };
      await patchChatRoomInfo(Number(partyId), updatedInfo);
      setChatRoomInfo(updatedInfo); // 상태를 업데이트하여 즉시 반영
      alert("채팅방 정보가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("채팅방 정보 수정 중 오류 발생:", error);
    }
  };

  // 채팅방 공개/비공개 상태 변경 핸들러
  const handleToggleVisibility = () => {
    const newAddFlag = !chatRoomInfo.addFlag; // 현재 상태의 반대 값으로 변경
    updateChatRoomInfo({ addFlag: newAddFlag });
    setChatRoomInfo((prev) => (prev ? { ...prev, addFlag: newAddFlag } : null));
  };

  // 날짜 수정 핸들러
  const handleChangeDate = () => {
    const newDate = prompt("새로운 날짜를 입력하세요 (YYYY-MM-DD HH:MM):", chatRoomInfo.date);
    if (newDate) {
      updateChatRoomInfo({ date: newDate });
    }
  };

  // 최대 인원 수정 핸들러
  const handleChangeMaxMember = () => {
    const newMaxMember = prompt("새로운 최대 인원 수를 입력하세요:", chatRoomInfo.maxMember.toString());
    if (newMaxMember) {
      updateChatRoomInfo({ maxMember: Number(newMaxMember) });
    }
  };

  // 채팅방 나가기 버튼 핸들러 정의
  const exitbuttonhandle = () => {
    console.log("채팅방 나가기 버튼");
    // 추가 기능 구현 가능
  };

  console.log("채팅방 정보:", chatRoomInfo);

  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" defaultValue="파티 목록" title="채팅방 설정" backHandler={() => nav(-1)} />
      </TopBar>
      <div css={titletext}>{chatRoomInfo.roomName}</div>

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
          onClick={handleChangeDate}
        >
          {chatRoomInfo.date}
        </InfoBox>

        {/* 최대 인원 변경 가능 */}
        <InfoBox
          fontSize={0.8}
          fontWeight={500}
          icon={<UserIcon />}
          color={"secondary"}
          size={1.3}
          style={{ margin: "0.5rem" }}
          onClick={handleChangeMaxMember}
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
            border: "0",
            fontSize: "1rem",
            backgroundColor: chatRoomInfo.addFlag ? `${Colors["primary"]["A200"]}` : `${Colors["secondary"]["200"]}`,
          }}
        >
          {chatRoomInfo.addFlag ? "채팅방 공개" : "채팅방 비공개"}
        </Button>
        <hr css={hr}></hr>
      </div>

      {/* 파티원 정보와 나가기 버튼 */}
      <div css={textcolor}>파티원</div>
      <div css={wait}>파티원 목록 자리</div>
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
