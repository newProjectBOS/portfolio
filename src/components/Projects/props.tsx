export type ProjectsLinkProps = {
    name: string;
    link: string;
    description: string;
    image: string;
    newimage?: string;
};

export type ProjectCardProps = ProjectsLinkProps & {
    isDark?: boolean;
    isHovered: boolean;
};
