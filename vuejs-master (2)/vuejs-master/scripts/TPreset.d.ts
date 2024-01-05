import { Preset } from 'unocss'

interface TPresetOptions {}

declare function TPreset(options?: TPresetOptions): Preset

export = TPreset
