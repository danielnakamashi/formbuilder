import { TriggerCondition } from '@formbuilda/core'

const conditionMapper: Record<TriggerCondition, (left: unknown, right: unknown) => boolean> = {
  [TriggerCondition.Any]: (_: unknown, __: unknown) => true,
  [TriggerCondition.Equals]: (left: unknown, right: unknown) => left === right,
  [TriggerCondition.GreaterOrEqualsThan]: (left: unknown, right: unknown) =>
    parseFloat(left as string) >= parseFloat(right as string),
  [TriggerCondition.GreaterThan]: (left: unknown, right: unknown) =>
    parseFloat(left as string) > parseFloat(right as string),
  [TriggerCondition.LessOrEqualsThan]: (left: unknown, right: unknown) =>
    parseFloat(left as string) <= parseFloat(right as string),
  [TriggerCondition.LessThan]: (left: unknown, right: unknown) =>
    parseFloat(left as string) < parseFloat(right as string),
}

export { conditionMapper }
