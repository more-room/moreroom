/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "../../../../components/TopBar";
import { IParty } from "../../../../types/chatingTypes";
import { useSearchPartiesStore } from "../../../../stores/chatingStore";
import { getPartyList } from "../../../../apis/chatApi"; // 파티 목록 API 호출
import { ThemeItem } from "../../../../components/ThemeItem"; // ThemeItem 컴포넌트 임포트
import { titletext, topbarcolor, textcolor, infobox, buttoncss, hr, exitbutton, wait } from "./styles";
import { InfoBox } from "../../../../components/InfoBox";
import { UserIcon } from "@heroicons/react/24/solid";
import { Button } from "../../../../components/Button";
import { Colors } from "../../../../styles/globalStyle";
import { useSuspenseQuery } from "@tanstack/react-query";

export const RoomdetailFetch = () => {
  const { partyId } = useParams<{ partyId: string }>(); // URL에서 partyId 가져오기
  const nav = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [buttonText, setButtonText] = useState("채팅방 공개");

  // 버튼 핸들러
  const buttonhandle = () => {
    console.log({ buttonText });
    setIsClicked((prevState) => !prevState);
    setButtonText((prevText) => (prevText === "채팅방 공개" ? "채팅방 비공개" : "채팅방 공개"));
  };

  const exitbuttonhandle = () => {
    console.log("채팅방 나가기 버튼");
  };

  // 파티 데이터를 가져오기 위해 useSuspenseQuery 사용
  const partyQuery = useSuspenseQuery({
    queryKey: ["Roomdetail"],
    queryFn: async () => await getPartyList(),
  });

  // 로딩 상태 처리
  if (partyQuery.isLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 처리
  if (partyQuery.error && !partyQuery.isFetching) {
    throw partyQuery.error;
  }

  // 파티 목록 가져오기
  console.log("전체 파티 목록:", partyQuery.data.data); // 데이터 구조 확인용 로그
  const partyList: IParty[] = partyQuery.data.data.partyList || []; // partyList 필드 접근

  // 선택한 파티 찾기 - partyId를 기준으로
  const selectedParty = partyList.find((party) => party.partyId === Number(partyId));

  // 해당 파티가 없는 경우 예외 처리
  if (!selectedParty || !selectedParty.theme) {
    return <div>해당 파티의 상세정보가 없습니다.</div>;
  }

  return (
    <div>
      <TopBar css={topbarcolor}>
        <TopBar.Title type="default" defaultValue="파티 목록" title="채팅방 설정" backHandler={() => nav(-1)} />
      </TopBar>
      <div css={titletext}>{selectedParty.roomName}</div>

      <div css={textcolor}>테마 정보</div>
      <ThemeItem theme={selectedParty.theme} />

      <div css={textcolor}>파티 정보</div>
      <div css={infobox}>
        <InfoBox fontSize={0.8} fontWeight={500} size={1.3} style={{ margin: "0.5rem" }}>
          {selectedParty.date}
        </InfoBox>

        <InfoBox
          fontSize={0.8}
          fontWeight={500}
          icon={<UserIcon />}
          color={"secondary"}
          size={1.3}
          style={{ margin: "0.5rem" }}
        >
          최대 {selectedParty.maxMember}명
        </InfoBox>
      </div>
      <div css={buttoncss}>
        <Button
          variant="contained"
          fullwidth={true}
          rounded={0.4}
          handler={buttonhandle}
          style={{
            border: "0",
            fontSize: "1rem",
            backgroundColor: isClicked ? `${Colors["secondary"]["200"]}` : `${Colors["primary"]["A200"]}`,
          }}
        >
          {buttonText}
        </Button>
        <hr css={hr}></hr>
      </div>
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
