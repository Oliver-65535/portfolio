interface SkillProps {
  skill: string
}

export default function Skill({ skill }: SkillProps) {
  return (
    <div className="flex items-center">
      <span className="text-sm font-medium">{skill}</span>
    </div>
  )
}
