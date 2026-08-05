import SafetyCertificateOutlined from "@ant-design/icons/SafetyCertificateOutlined";
import { Steps, Typography } from "antd";
import type { StepsProps } from "antd";
import type { AssignmentFlowStatus } from "../../types";

const { Text } = Typography;

interface PlatformActivityChecklistProps {
    flowStatus: AssignmentFlowStatus;
    activeStep: number;
}

const activity = [
    ["Availability validation", "Vehicle and driver are active and available"],
    ["Conflict detection", "Schedule and route overlaps checked"],
    ["Driver notification", "Assignment instructions sent to driver"],
    ["Assignment audit log", "Dispatch decision recorded"],
] as const;

export function PlatformActivityChecklist({
    flowStatus,
    activeStep,
}: PlatformActivityChecklistProps) {
    const isComplete = flowStatus === "assigned";
    const items: StepsProps["items"] = activity.map(([title, content], index) => {
        let status: "wait" | "process" | "finish" | "error" = "wait";

        if (isComplete || index < activeStep) status = "finish";
        if (flowStatus === "validating" && index === activeStep) status = "process";
        if (flowStatus === "error" && index === activeStep) status = "error";

        return { title, content, status };
    });

    return (
        <section className="activity-panel" aria-labelledby="activity-title">
            <div className="activity-heading">
                <span className="activity-icon"><SafetyCertificateOutlined /></span>
                <div>
                    <Text id="activity-title" className="section-kicker">Platform activity</Text>
                    <Text type="secondary">
                        {flowStatus === "validating" ? "Checks are running…" : "Automated dispatch controls"}
                    </Text>
                </div>
            </div>
            <Steps orientation="vertical" size="small" current={activeStep} items={items} />
        </section>
    );
}
