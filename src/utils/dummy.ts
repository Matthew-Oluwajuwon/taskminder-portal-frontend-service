/* eslint-disable prettier/prettier */
export interface CompletedProp {
  cardTitle: string
  date: string
  subTask: number
  percent: number
  color: string
}
export const completedItems: CompletedProp[] = [
  {
    cardTitle: "Design rectification",
    date: "May 1 - May 10",
    subTask: 4,
    percent: 100,
    color: "#07F349",
  },
  {
    cardTitle: "Express dashboard upgrade",
    date: "May 12 - May 17",
    subTask: 3,
    percent: 100,
    color: "#0749F3",
  },
  {
    cardTitle: "Workspace setup",
    date: "May 20 - May 28",
    subTask: 15,
    percent: 100,
    color: "#F38707",
  },
  {
    cardTitle: "New app feature",
    date: "June 1 - June 10",
    subTask: 15,
    percent: 100,
    color: "#A8F307",
  },
  {
    cardTitle: "Blockchain task",
    date: "June 8 - June 15",
    subTask: 15,
    percent: 100,
    color: "#B701E5",
  },
]

export interface OngoingProps {
  cardTitle: string
  noOfDays: number
  subTask: number
  percent: number
  color: string
}

export const ongoingItems: OngoingProps[] = [
  {
    cardTitle: "Design rectification",
    noOfDays: 5,
    subTask: 4,
    percent: 50,
    color: "#07F349",
  },
  {
    cardTitle: "Express dashboard upgrade",
    noOfDays: 10,
    subTask: 3,
    percent: 80,
    color: "#0749F3",
  },
  {
    cardTitle: "Workspace setup",
    noOfDays: 7,
    subTask: 15,
    percent: 40,
    color: "#F38707",
  },
  {
    cardTitle: "New app feature",
    noOfDays: 7,
    subTask: 15,
    percent: 40,
    color: "#A8F307",
  },
  {
    cardTitle: "Blockchain task",
    noOfDays: 7,
    subTask: 15,
    percent: 40,
    color: "#B701E5",
  },
]

export interface PendingProps {
  cardTitle: string
  noOfDays: number
  subTask: number
  percent: number
  color: string
}
export const pendingItems: PendingProps[] = [
  {
    cardTitle: "Design rectification",
    noOfDays: 5,
    subTask: 4,
    percent: 50,
    color: "#07F349",
  },
  {
    cardTitle: "Express dashboard upgrade",
    noOfDays: 10,
    subTask: 3,
    percent: 80,
    color: "#0749F3",
  },
  {
    cardTitle: "Workspace setup",
    noOfDays: 7,
    subTask: 15,
    percent: 40,
    color: "#F38707",
  },
  {
    cardTitle: "New app feature",
    noOfDays: 7,
    subTask: 15,
    percent: 40,
    color: "#A8F307",
  },
  {
    cardTitle: "Blockchain task",
    noOfDays: 7,
    subTask: 15,
    percent: 40,
    color: "#B701E5",
  },
]

export interface UpcomingProp {
  cardTitle: string
  date: string
  subTask: number
  percent: number
}
export const upcomingItems: UpcomingProp[] = [
  {
    cardTitle: "Design rectification",
    date: "May 1 - May 10",
    subTask: 4,
    percent: 100,
  },
  {
    cardTitle: "Express dashboard upgrade",
    date: "May 12 - May 17",
    subTask: 3,
    percent: 100,
  },
  {
    cardTitle: "Workspace setup",
    date: "May 20 - May 28",
    subTask: 15,
    percent: 100,
  },
  {
    cardTitle: "New app feature",
    date: "June 1 - June 10",
    subTask: 15,
    percent: 100,
  },
  {
    cardTitle: "Blockchain task",
    date: "June 8 - June 15",
    subTask: 15,
    percent: 100,
  },
]
