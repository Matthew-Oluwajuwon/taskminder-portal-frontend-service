/* eslint-disable prettier/prettier */
import { Card, Progress } from "antd"
import React from "react"
import More from "../../../assets/icons/more.svg"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { staggeredChildren, staggeredListMotion } from "../../../utils/motion"

export const ListCard: React.FC<any> = ({
  items,
  keys,
  cardUrl,
}: {
  items: any[]
  keys: string
  cardUrl: string
}) => {
  const navigate = useNavigate()

  return (
    <motion.div
      variants={staggeredListMotion()}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div
          variants={staggeredChildren}
          className="w-full border-none rounded-none mt-5 cursor-pointer"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 10,
          }}
          whileHover={{ scale: 1.05 }}
          key={index}
        >
          <Card
            key={index}
            
            className={`w-full border-none rounded-none mt-5 ${cardUrl ? "cursor-pointer" : "cursor-not-allowed"} dark:bg-[#0E0D0D!important]`}
            onClick={() =>
              cardUrl && navigate(
                cardUrl + item.cardTitle?.toLowerCase().replaceAll(" ", "-"),
                { state: item },
              )
            }
          >
            <div key={index} className="flex justify-between items-center">
              <h1 className="font-[Epilogue-500] text-[1rem] text-black dark:text-[#ffffff!important]">
                {item.cardTitle}
              </h1>
              <img src={More} className="dark:text-[#CDCBCB]" alt="" />
            </div>
            <div className="flex justify-between items-center my-1 font-[Epilogue-500]">
              <p className="dark:text-[#CDCBCB]">
                <span className="font-[Epilogue-600]">
                  {keys === "1" || keys === "4"
                    ? item.noOfDays
                    : keys === "2" || keys === "3"
                    ? item.date
                    : ""}
                </span>{" "}
                {keys === "1" ? "days left" : keys === "4" ? "days ago" : ""}
              </p>
              <p className="dark:text-[#CDCBCB]">
                <span className="font-[Epilogue-600]">{item.subTask}</span>{" "}
                sub-tasks {keys === "4" ? "left" : ""}
              </p>
            </div>
            {keys === "1" || keys === "3" || keys === "4" ? (
              <div className="flex items-center justify-between">
                <Progress
                  percent={item.percent}
                  size={["90%" as any, 5]}
                  strokeColor={item.color}
                  showInfo={false}
                />
                <span className="flex gap-1 items-center dark:text-[#CDCBCB]">
                  <span
                    className={`font-semibold dark:text-[#CDCBCB]`}
                    style={{ color: item.color }}
                  >
                    {item.percent}%
                  </span>
                  done
                </span>
              </div>
            ) : null}
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
