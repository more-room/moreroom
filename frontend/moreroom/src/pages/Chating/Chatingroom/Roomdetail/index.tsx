/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TopBar } from "../../../../components/TopBar";
import { IParty } from "../../../../types/chatingTypes";
import { useSearchPartiesStore } from "../../../../stores/chatingStore";
import { getPartyList } from "../../../../apis/chatApi"; // 파티 목록 API 호출
import { ThemeItem } from "../../../../components/ThemeItem"; // ThemeItem 컴포넌트 임포트
import { titletext, textcolor, infobox } from "./styles";
import { InfoBox } from "../../../../components/InfoBox";
import { UserIcon } from "@heroicons/react/24/solid";

export const Roomdetail = () => {
  const { partyId } = useParams<{ partyId: string }>(); // URL에서 partyId 가져오기
  const searchPartiesStore = useSearchPartiesStore();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const partyList: IParty[] = searchPartiesStore.results?.content || [];

  useEffect(() => {
    if (partyList.length === 0) {
      // 파티 목록을 가져오는 API 호출
      getPartyList()
        .then(response => {
          searchPartiesStore.setResults(response.data); // 스토어에 데이터 설정
          setIsLoading(false); // 데이터 로드 완료
        })
        .catch(error => {
          console.error("데이터 로드 중 오류 발생:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [partyList, searchPartiesStore]);

  // 선택한 파티 찾기
  const selectedParty = partyList.find(party => party.partyId === Number(partyId));

  // 데이터가 로드 중일 때 로딩 메시지 표시
  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }

  // 해당 파티가 없는 경우 예외 처리
  if (!selectedParty || !selectedParty.theme) {
    return <div>해당 파티의 상세정보가 없습니다.</div>;
  }

  return (
    <div>
      <TopBar>
        <TopBar.Title type="default" defaultValue="파티 목록" title="채팅방 설정" />
      </TopBar>
      <div css={titletext}>{selectedParty.roomName}</div>
      
      <div css={textcolor}>테마 정보</div>
      <ThemeItem theme={selectedParty.theme} />

      <div css={textcolor}>파티 정보</div>
      <div css={infobox}>
        <InfoBox fontSize={0.8} fontWeight={500} size={1.3} style={{ margin: '0.5rem' }}>
          {selectedParty.date}
        </InfoBox>

        <InfoBox fontSize={0.8} fontWeight={500} icon={<UserIcon />} color={'secondary'} size={1.3} style={{ margin: '0.5rem' }}>
          최대 {selectedParty.maxMember}명
        </InfoBox>
      </div>
    </div>
  );
};
