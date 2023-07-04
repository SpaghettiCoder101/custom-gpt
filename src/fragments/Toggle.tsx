import { Switch } from "@headlessui/react";
import React, { useState } from "react";

type Props = {
  onToggle: (enabled: boolean) => void;
  label?: string;
  parentClassName?: string;
  labelClassName?: string;
  switchClassName?: string;
  thumbClassName?: string;
  enabledColor?: string;
  disabledColor?: string;
};
// TODO remove or use it as a template if needed
export default function Toggle(props : Props ) {
    const enabledColor = props.enabledColor || "bg-green-300";
    const disabledColor = props.disabledColor || "bg-gray-200";
  
    const [enabled, setEnabled] = useState(false);

    function onToggle() {
        setEnabled(!enabled);
        props.onToggle(!enabled);
    }

    return (
        <div className={props.parentClassName}>
            <Switch.Group>
                {props.label ? <Switch.Label className={props.labelClassName}>{props.label}</Switch.Label> : null}
                <Switch
                    checked={enabled}
                    onChange={onToggle}
                    className={`${
                        enabled ? enabledColor : disabledColor
                    } relative inline-flex h-6 w-11 items-center rounded-full ${props.switchClassName}`}
                >
                    {props.label ? <span className="sr-only">{props.label}</span> : null}
                    <span
                        className={`${
                            enabled ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition ${props.thumbClassName}`}
                    />
                </Switch>
            </Switch.Group>
        </div>
    );
}
