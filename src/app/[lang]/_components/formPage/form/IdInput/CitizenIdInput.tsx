import { Input, InputRef, Space } from "antd";
import React, { useRef } from "react";

interface CitizenIdInputProps {
  value: string;
  onchange: (value: string) => void;
}

export default function CitizenIdInput({ value = "", onchange }: CitizenIdInputProps) {
  const citizen1 = useRef<InputRef>(null);
  const citizen2 = useRef<InputRef>(null);
  const citizen3 = useRef<InputRef>(null);
  const citizen4 = useRef<InputRef>(null);
  const citizen5 = useRef<InputRef>(null);

  const idSegments = [
    { maxLength: 1, width: 32, seg: citizen1, nextSeg: citizen2 },
    { maxLength: 4, width: 56, seg: citizen2, nextSeg: citizen3 },
    { maxLength: 5, width: 62, seg: citizen3, nextSeg: citizen4 },
    { maxLength: 2, width: 40, seg: citizen4, nextSeg: citizen5 },
    { maxLength: 1, width: 32, seg: citizen5, nextSeg: null },
  ];

  const segmentValues = [
    value.slice(0, 1),
    value.slice(1, 5),
    value.slice(5, 10),
    value.slice(10, 12),
    value.slice(12, 13),
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,

    nextRef: React.RefObject<InputRef> | null,
    prevRef: React.RefObject<InputRef> | null
  ) => {
    if (e.target.value.length === e.target.maxLength) {
      if (nextRef) {
        nextRef.current?.focus();
      }
    }

    if (e.target.value === "" && prevRef) {
      prevRef?.current?.focus();
    }

    const values = idSegments.map((item) => item.seg.current?.input?.value || "");
    const fullCitizenId = values.join("");
    onchange(fullCitizenId);
  };

  return (
    <>
      <Space style={{ display: "flex", gap: "16px" }}>
        {idSegments.map((item, index) => {
          return (
            <div key={index} style={{ display: "flex", gap: "16px" }}>
              {index >= 1 && index < idSegments.length ? <div>-</div> : null}
              <Input
                ref={item.seg}
                maxLength={item.maxLength}
                placeholder={"0".repeat(item.maxLength)}
                value={segmentValues[index]}
                style={{ width: item.width }}
                onChange={(e) => {
                  handleInputChange(e, item.nextSeg, idSegments[index - 1]?.seg);
                }}
              />
            </div>
          );
        })}
      </Space>
    </>
  );
}

/*

1 = 32 
2 = 2 * 20
3 = 3 * 15
4 = 4 * 14
5 = 2 * 22 + 3 * 6

*/
