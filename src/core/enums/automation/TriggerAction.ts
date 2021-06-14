enum TriggerAction {
  Hide = 1,
  Show = -1,
  MakeRequired = 2,
  MakeOptional = -2,
}

function invert(action: TriggerAction): TriggerAction {
  return -action
}

export { TriggerAction, invert }
