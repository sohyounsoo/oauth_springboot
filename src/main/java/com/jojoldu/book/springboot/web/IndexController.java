package com.jojoldu.book.springboot.web;

import com.jojoldu.book.springboot.config.auth.LoginUser;
import com.jojoldu.book.springboot.config.auth.dto.SessionUser;
import com.jojoldu.book.springboot.service.posts.PostsService;
import com.jojoldu.book.springboot.web.dto.PostsResponseDto;
import com.jojoldu.book.springboot.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;

@RequiredArgsConstructor
@Controller
public class IndexController {
    private final PostsService postsService;
    private final HttpSession httpSession;

    @GetMapping("/")
    public String index(Model model, @LoginUser SessionUser user) {

        if(user != null) {
            model.addAttribute("loginUserName", user.getName());
            model.addAttribute("email", user.getEmail());
        }

        return "index";
    }

    @GetMapping("/posts/save")
    public String postsSave() {
        return "posts-save";
    }

    @GetMapping("/posts/update/{id}")
    public String postsUpdate(@PathVariable Long id, Model model) {
        PostsResponseDto dto = postsService.findById(id);
        model.addAttribute("post", dto);

        return "posts-update";
    }

    @GetMapping(value = "/posts/selectList")
    public String selectMonitoringListAjax(Model model, @PageableDefault(sort = "id", direction = Sort.Direction.DESC, size = 2) Pageable pageable) throws Exception {
        ArrayList pageIndex = new ArrayList();
        int total = postsService.findAll(pageable).getTotalPages();

        for(int i=0; i<total; i++){
            pageIndex.add(i);
        }
        model.addAttribute("pageIndex", pageIndex);
        model.addAttribute("posts", postsService.findAll(pageable));
        //model.addAttribute("previous", pageable.previousOrFirst().getPageNumber());
        //model.addAttribute("next", pageable.next().getPageNumber());

        return "posts-list";
    }

}
