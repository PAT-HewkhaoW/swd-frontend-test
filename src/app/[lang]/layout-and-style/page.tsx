"use client";

import { useTranslation } from "@/app/i18n/client";
import React, { useEffect, useState } from "react";
import "./LayoutAndStyle.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Spin } from "antd";

interface Item {
  shape: string;
  offset?: number;
}

const items: Item[] = [
  {
    shape: "skewed-rectangle",
    offset: 6,
  },
  {
    shape: "rectangle",
  },
  {
    shape: "square",
    offset: 3,
  },
  {
    shape: "circle",
  },
  {
    shape: "oval",
  },
  {
    shape: "trapezoid",
  },
];

export default function LayoutPage() {
  const { t } = useTranslation(undefined, ["layout"]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // state
  const [shapeList, setShapeList] = useState<Item[]>(items);
  const [offset, setOffset] = useState([6, 3]);
  // state#end

  // func

  const shuffleShapeArray = (array: Item[]) => {
    // (Fisher–Yates shuffle
    const shuffledArray = [...array];
    let currentIndex = array.length;

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);

      currentIndex--;

      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[currentIndex],
      ];
    }

    return shuffledArray;
  };

  const handleSwitchLayout = () => {
    // let newList = [...shapeList];

    // newList = newList.map((item, index) => {
    //   if (index === 0) {
    //     return { ...item, offset: item.offset === 6 ? 3 : 6 };
    //   } else if (index === 3) {
    //     return { ...item, offset: item.offset === 3 ? 6 : 3 };
    //   }
    //   return item;
    // });

    const newOffset = [...offset];

    [newOffset[0], newOffset[1]] = [newOffset[1], newOffset[0]];

    setOffset(newOffset);
  };

  const handleMoveItem = (direction: string) => {
    const newList = [...shapeList];
    if (direction == "left") {
      const first = newList.shift();

      if (first != undefined) {
        newList.push(first);
      }
    } else if (direction == "right") {
      const last: Item | undefined = newList.pop();
      if (last != undefined) {
        newList.unshift(last);
      }
    }

    setShapeList(newList);
  };

  const handleShufflePosition = () => {
    setShapeList(shuffleShapeArray(shapeList));
  };

  // func#end

  if (!isClient) {
    return (
      <Spin
        indicator={<LoadingOutlined spin style={{ fontSize: 48 }} />}
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="page-title">{t("pageTitle")}</div>
        <div className="layout-and-style-container">
          <div className="page-content">
            <div className="button-container">
              {/* use antd grid layout */}
              <Row gutter={24}>
                <Col span={6}>
                  <div className="button-group" onClick={() => handleMoveItem("left")}>
                    <div className="action-button">
                      <i className="swd-shape triangle left" />
                    </div>

                    <div className="label">{t("moveShape")}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <Row className="button-group" onClick={() => handleSwitchLayout()}>
                    <Col span={12}>
                      <div className="action-button">
                        <i className="swd-shape triangle" />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="action-button">
                        <i className="swd-shape triangle down" />
                      </div>
                    </Col>

                    <div className="label">{t("movePosition")}</div>
                  </Row>
                </Col>
                <Col span={6}>
                  <div className="button-group" onClick={() => handleMoveItem("right")}>
                    <div className="action-button">
                      <i className="swd-shape triangle right" />
                    </div>

                    <div className="label">{t("moveShape")}</div>
                  </div>
                </Col>
              </Row>
              {/* use antd grid layout */}
            </div>

            <Divider />

            <div className="shape-container">
              <Row gutter={[24, 24]}>
                {shapeList.map((item, index) => (
                  <Col
                    span={6}
                    key={index}
                    offset={index == 0 ? offset[0] : index == 3 ? offset[1] : 0}
                  >
                    <div className="button-group" onClick={() => handleShufflePosition()}>
                      <div className="action-button">
                        <i className={`swd-shape ${item.shape}`} />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
