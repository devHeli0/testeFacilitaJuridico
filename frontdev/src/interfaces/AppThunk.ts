import type { ThunkDispatch } from '@reduxjs/toolkit'
import type { Action } from 'redux'

import type { RootState } from '../store'

interface AppThunk<ReturnType = void> {
  (
    dispatch: ThunkDispatch<RootState, unknown, Action<string>>,
    getState: () => RootState,
    extraArgument: undefined,
  ): ReturnType
}

export default AppThunk
