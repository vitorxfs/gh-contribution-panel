import { changeDateFormat } from '@/helpers/date.helper'
import { Contribution } from './contribution';
import contributionItemVariants from './variants'
import Tooltip from '../Tooltip'

interface ContributionItemProps {
  contribution: Contribution,
  color: 'default' | 'primary' | 'secondary'
}

const TooltipContent = ({ contribution }: {contribution: Contribution}) => {
  const count = contribution.count
  return (
    <>
      <p className="font-bold">
        {changeDateFormat(contribution.date, 'YYYY-MM-DD', 'DD/MM/YYYY')}
      </p>

      <p>
        {count === 0 ? 'Nenhuma' : count}
        {` `}
        {count <= 1 ? 'contribuição' : 'contribuições'}
      </p>
    </>
  )
}

export const ContributionItem = ({ contribution: c, color }: ContributionItemProps) => {
  return (
    <Tooltip content={(<TooltipContent contribution={c} />)} >
      <span className={contributionItemVariants({ count: c.level, color })}/>
    </Tooltip>
  )
}
